import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { OTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListarPage implements OnInit {
  
  now = new Date();
  lessWeek = new Date();
  l = this.lessWeek.setDate(this.lessWeek.getDate()-365);

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

  constructor(
    private OTService: OTService,
    private _datePipe: DatePipe,
    private alertController: AlertController,

  ) {
 
   }
   

  ngOnInit() {
    /**
    * ngx datatable
    */
    this.columns = [
      // { prop: 'Estado.nombre', name: 'Estado', summaryFunc: cells => this.summaryForEstado(cells) },
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

    this.OTService.getOTBy(this.lessWeek,this.now,'')
    .then(res=>{
      // this.listadoOT = res
      console.log(res)
    /**
    * ngx datatable
    */
    this.rows = res
    this.temp = res
    })


  }

  getRowClass = (row) => {    
    return {
      'row-color-espera': row.Estado.nombre == environment.ESTADO_ESPERA,
      'row-color-retirado': row.Estado.nombre == environment.ESTADO_RETIRAR,
      'row-color-finalizado': row.Estado.nombre == environment.ESTADO_FINALIZADO,
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

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
