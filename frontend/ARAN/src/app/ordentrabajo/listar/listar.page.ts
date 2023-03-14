import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { OTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';
import { MessangerService } from 'src/app/services/messanger/messanger.service';
import { environment } from 'src/environments/environment';
import { interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListarPage implements OnInit, OnDestroy {
  
  now = new Date();
  fromDate = new Date();

  // set por defecto últimos N días
  l = this.fromDate.setDate(this.fromDate.getDate()-30);

  listadoOT;

  /**
   * ngx datatable
   */
  // public data: Data;
  public columns: any;
  public rows: any;
  loadingIndicator = true;
  reorderable = true;
  temp: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  selected = [];

  $subscription: Subscription


  constructor(
    private OTService: OTService,
    private _datePipe: DatePipe,
    private alertController: AlertController,
    private messangerService: MessangerService

  ) {
 
   }
   

  ngOnInit() {
    /**
    * ngx datatable
    */
    this.columns = [
      // { prop: 'Estado.nombre', name: 'Estado', summaryFunc: cells => this.summaryForEstado(cells) },
      { prop: 'Cliente.celular', name: 'Mensaje', 
        summaryFunc: () => null },
      { prop: 'Estado.nombre', name: 'Estado', 
        summaryFunc: () => null },
      { prop: 'Cliente.apellido', name: 'Cliente', summaryFunc: () => null },
      { prop: 'Trabajo.nombre', name: 'Trabajo', summaryFunc: () => null },
      { prop: 'Moto.modelo', name: 'Moto', summaryFunc: () => null },
      { prop: 'fecha_entrega_estimada', 
        name: 'Fecha Entrega', 
        pipe:this.datePipe(), summaryFunc: () => null },
      {prop: 'createdAt', name:'Fecha Ingreso', pipe: this.datePipe(), summaryFunc: () => null}
    ];

    this.OTService.getOTBy(this.fromDate,this.now,'')
    .then(res=>{
      // this.listadoOT = res
      console.log(res)
    /**
    * ngx datatable
    */
    this.rows = res;
    //this.rows = [...this.rows];
    this.temp = res;
    //this.temp = [...this.temp];


    });

    // // In your code after loading rows data
    // // simulate client click to reload table
    // setTimeout(() => {
    //   this.table.element.click();
    //   console.log('timeout')
    // }, 500);

    this.refreshTable();

  }

  async refreshTable(){
    const intervalo = interval(3500);
    this.$subscription =  intervalo.subscribe(n=>{
      this.OTService.getOTBy(this.fromDate,this.now,'')
      .then(res=>{
        this.rows = res;
        this.temp = res;
        console.log('_subscribe')

        // if in this moment the user is filter data of table
        let val = (<HTMLInputElement>document.getElementById('filterByCliente')).value;
        if (val && val != ''){
          console.log('val en refreshtable true',val)
          console.log('in refresh table is filtering.. call update filter.')
          this.updateFilter(null, val);
        }else{
          console.log('val en refreshtable false',val)
        }
      });
    })
  }

  ngOnDestroy() {
    console.log('ngOnDestroy')
    if (this.$subscription){
      this.$subscription.unsubscribe()
      console.log('unsubscribe list onDestroy')
    }
  }

  /**
   * Handle Send sms
   * @param value 
   * @returns 
   */
  handleSendSms(row){
    console.log('row sms: ',row);

    if (!row.Cliente.celular){
      alert('El cliente no posee número de celular registrado')
      return false
    }
    let cel = row.Cliente.celular
    let id_orden = row.id
    let informado = row.informado
    this.alertConfirmSms(cel, id_orden, informado)
  }

   /**
   * Send sms from whatsapp messanger api service
   * @param value 
   * @returns 
   */
   private sendSms(cel, id_orden){
    console.log('send sms: ',cel); 
    let data = {
      "phone": '549'+cel,
      "message":'Su trabajo en Arancibia Rectificaciones ya está listo para retirar'
    }
    console.log(data)
    this.messangerService.postSendSms(data).then(res=>{
      console.log('res messageService',res)
      if(res['responseExSave']['id']){
        console.log('Mensaje Enviado Correctamente')        
        // registrar envío correcto de msj
        let changes = {
          id_orden: id_orden
        }
        this.OTService.putRegistrarInformado(id_orden, changes).then(res=>{
          console.log('res informado ot a cliente: ', res);
          alert('Mensaje enviado correctamente al número: '+cel);
          
          // Actualizar vista planilla

        })
      }else{
        console.log('error enviando msj')
        alert('Error enviando mensaje');
      }
    })

  }




  getRowClass = (row) => {    
    return {
      'row-color-espera': row.Estado.nombre == environment.ESTADO_ESPERA,
      'row-color-retirado': row.Estado.nombre == environment.ESTADO_RETIRAR,
      'row-color-finalizado': row.Estado.nombre == environment.ESTADO_FINALIZADO && row.informado == false,
      'row-color-finalizado-informado': row.Estado.nombre == environment.ESTADO_FINALIZADO && row.informado == true,
      'row-color-proceso': row.Estado.nombre == environment.ESTADO_PROCESO,
    };
  }

  datePipe () {
    return {transform: (value) => this._datePipe.transform(value, 'EE dd/MM')};
  }
  
  private summaryForEstado(cells: string[]) {
    const esperas = cells.filter(cell => cell === 'espera').length;
    const procesos = cells.filter(cell => cell === 'proceso').length;
    // const finalizados = cells.filter(cell => cell === 'finalizado').length;
    // const retirados = cells.filter(cell => cell === 'retirado').length;

    return `espera: ${esperas}, proceso: ${procesos}`;
    // return `espera: ${esperas}, proceso: ${procesos},finalizado: ${finalizados},retirado: ${retirados} `;
  }

  updateFilter(event, val='') {
        
    if (event == null){
      let val = (<HTMLInputElement>document.getElementById('filterByCliente')).value;
      console.log('val event null: (esta filtrando)',val)
      if (val = ''){
        
      }
    }else{
      val = event.target.value.toLowerCase();
      console.log('val event != null: (no hay nada escrito en filter)',val)
    }
    

    // filter our data
    const temp = this.temp.filter(function (d) {
      if (d.Cliente && d.Cliente.apellido){
        return d.Cliente.apellido.toLowerCase().indexOf(val) !== -1 || !val ;
      }else{
        return d;
      }
      
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;


  //   const value = event.target.value.toLowerCase().trim();
  //   // get the amount of columns in the table
  //   const count = this.columns.length;
  //   // get the key names of each column in the dataset
  //   const keys = Object.keys(this.temp[0]);
  //   // assign filtered matches to the active datatable
  //   this.rows = this.temp.filter(item => {
  //     // iterate through each row's column data
  //     for (let i = 0; i < count; i++) {
  //       // check for a match
  //       if (
  //         (item[keys[i]] &&
  //           item[keys[i]]
  //             .toString()
  //             .toLowerCase()
  //             .indexOf(value) !== -1) ||
  //         !value
  //       ) {
  //         // found match, return true to add to result set
  //         return true;
  //       }
  //     }
  //   });

  //   // Whenever the filter changes, always go back to the first page
  //    this.table.offset = 0;
   }

   onActivate(event) {
    if(event.type == 'click') {
        //this.selected = []
        console.log('event.row ',event.row);
        this.selected = event.row
        console.log('this.selected ',this.selected)
        //let text = (JSON.stringify(this.selected));
        //let obj = JSON.parse(text);
        //console.log(obj.Cliente.nombre)
        //this.presentAlertConfirm(obj)
        
    }
  }

  async alertConfirmSms(cel, id_orden, informado) {
    let header = 'Confirmar';
    let text = 'Enviar SMS';
    let message = 'Desea enviar mensaje informando trabajo finalizado al número: '+cel+' ?'

    if (informado == true){
      header = 'Reenviar';
      text = 'Reenviar SMS';
      message = 'Seguro desea volver a enviar mensaje al número: '+cel+' ?'

    }
    const alert = await this.alertController.create({
      header: header,
      message: message,
    
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cerrar');
            
          }
        },
        {
          text: text,
          handler: () => {
            console.log('Cerrar');
            this.sendSms(cel, id_orden)
          }
        }
      ]
    });

    await alert.present();


  }

  /**
   * Set fecha desde para búsqueda de OTs
   * resta a la fecha actual n cantidad de días.
   */
  setDateFrom(n: number){ 
    this.fromDate = new Date();
    this.fromDate.setDate(this.fromDate.getDate() - n);
    console.log('n',n)
    console.log('setDateFrom',this.fromDate)
  }

  // async presentAlertConfirm(obj) {
  //   const alert = await this.alertController.create({
  //     header: 'Datos',
  //     //message: JSON.stringify(this.selected),
  //     inputs:[
  //       {
  //         name: 'Cliente',
  //         type: 'text',
  //         value: obj.Cliente.nombre,
  //       },
  //       {
  //         name: 'name2',
  //         type: 'text',
  //         id: 'name2-id',
  //         value: 'hello',
  //         placeholder: 'Placeholder 2'
  //       },
  //       {
  //         name: 'name3',
  //         value: 'http://ionicframework.com',
  //         type: 'url',
  //         placeholder: 'Favorite site ever'
  //       },
  //       // input date with min & max
  //       {
  //         name: 'name4',
  //         type: 'date',
  //         min: '2017-03-01',
  //         max: '2018-01-12'
  //       },
  //       // input date without min nor max
  //       {
  //         name: 'name5',
  //         type: 'date'
  //       },
  //       {
  //         name: 'name6',
  //         type: 'number',
  //         min: -5,
  //         max: 10
  //       },
  //       {
  //         name: 'name7',
  //         type: 'number'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cerrar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Cerrar');
            
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();


  // }

}
