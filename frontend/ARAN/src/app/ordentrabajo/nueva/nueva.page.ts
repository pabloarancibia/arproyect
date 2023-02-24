import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { interval, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertController, ModalController } from '@ionic/angular';
import { NuevoComponent } from 'src/app/cliente/nuevo/nuevo.component';
import { BuscaragregarmotoComponent } from 'src/app/moto/buscaragregarmoto/buscaragregarmoto.component';
import { TrabajosService } from 'src/app/services/trabajos/trabajos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.page.html',
  styleUrls: ['./nueva.page.scss'],
})
export class NuevaPage implements OnInit, OnDestroy {

  formNuevaOT: FormGroup;
  isAddMode: boolean =  true;
  now = new Date();
  nueva = {}
  cliente = [];
  moto = [];
  trabajos = [];

  subscription: Subscription 

  constructor(
    private fb: FormBuilder,
    private nuevaOTService: OTService,
    private eventosService: EventosService,
    private modalCtrl: ModalController,
    private trabajosServices: TrabajosService,
    private alertController: AlertController,
    private router: Router
    ) { 

    this.formNuevaOT = this.fb.group({
      'tarjeta': new FormControl(""),
      'TarjetaId': new FormControl(""),
      'ordenPapel': new FormControl(""),
      'TrabajoId': new FormControl("",[Validators.required]),
      
      'ClienteId': new FormControl("",[Validators.required]),
      'MotoId': new FormControl("",[Validators.required]),
      'repuestos': new FormControl(""),

      'detalle': new FormControl(""),
      'precio': new FormControl(""),
      'entrega': new FormControl(""),
      'saldo': new FormControl(""),

      'fecha_entrega_estimada': new FormControl("",),

      'estado': new FormControl(""),
    });

   }


  ngOnInit() {
    this.isAddMode = true;

    //traigo tipos de trabajo
    this.trabajosServices.getTrabajos()
    .then(res=>{
      console.log('res trabajos', res['listadoTrabajos'])
      this.trabajos = res['listadoTrabajos'];
      console.log('this.trabajos',this.trabajos)
    })
  }

  onSubmit(action: string){
    if (this.isAddMode){
      this.presentAlertConfirm(action)
    }


    if (!this.isAddMode){
      console.log('this.editarOT()');
    }
  }

  private agregarOT(action: string){
    if (this.formNuevaOT.valid) {
      // set estado
      this.formNuevaOT.controls["estado"].setValue(environment.ESTADO_ESPERA);
    
      console.log('this.formNuevaOT.value: ',this.formNuevaOT.value)
      const nuevaOT = this.formNuevaOT.value;  
      
      // check datas
      if (nuevaOT.fecha_entrega_estimada == "" || 
      !nuevaOT.fecha_entrega_estimada ||
      nuevaOT.fecha_entrega_estimada == null){
        nuevaOT.fecha_entrega_estimada = this.now;
      }
      if (nuevaOT.tarjeta == "" || 
      !nuevaOT.tarjeta ||
      nuevaOT.tarjeta == null){
        nuevaOT.tarjeta = environment.TARJETA_NO_ASIGNADA;
      }

      if (nuevaOT.ordenPapel == "" || 
      !nuevaOT.ordenPapel ||
      nuevaOT.ordenPapel == null){
        nuevaOT.ordenPapel = environment.TARJETA_NO_ASIGNADA;
      }

      if (nuevaOT.precio == "" || nuevaOT.precio == " " ||
      !nuevaOT.precio ||
      nuevaOT.precio == null){
        nuevaOT.precio = 0;
      }

      if (nuevaOT.entrega == "" || nuevaOT.entrega == " " ||
      !nuevaOT.entrega ||
      nuevaOT.entrega == null){
        nuevaOT.entrega = 0;
      }

      

      // send data
      this.nuevaOTService.nuevaOTService(nuevaOT)
        .then(res=>{
          console.log('envio data nueva ot ok, res: ', res);

          // limpio formulario segun action
          this.resetForm(action);
        })
    }
  }

  calcSaldo(){
    //this.formNuevaOT['saldo'] = this.formNuevaOT['precio'];
    this.formNuevaOT.controls['saldo'].setValue(this.formNuevaOT.controls['precio'].value - this.formNuevaOT.controls['entrega'].value);
  }

  addNumeroTarjeta(){
    const fecha_desde = new Date()
    // fecha_desde.setHours(0)
    // fecha_desde.setMinutes(0)
    // fecha_desde.setSeconds(0)
    // fecha_desde.setMilliseconds(0)
    // const timestamp = fecha_desde.getTime();

    const intervalo = interval(2000);
    document.getElementById('addNumeroTarjeta').setAttribute('disabled','true');
    document.getElementById('cancelAddNumeroTarjeta').setAttribute('disabled','false');
    let countObs = 0;
    this.subscription =  intervalo.subscribe(n=>{
      'buscar numero tarjeta'
      this.eventosService.getUltimoEventoByAccion(environment.ACCION_NUEVA, fecha_desde)
      .then(res=>{
        console.log('this.subscription res ', res)
        this.nueva = res
        if (this.nueva){
          console.log('último evento, tarjeta n: ',this.nueva['Tarjeta']['numero'])
          console.log('último evento tarjeta id: ',this.nueva['Tarjeta']['id'])
        console.log('tarjeta actual: ',this.formNuevaOT.controls["tarjeta"].value)
        if (this.nueva['Tarjeta']['numero']!== this.formNuevaOT.controls["tarjeta"].value){
          this.formNuevaOT.controls["tarjeta"].setValue(this.nueva['Tarjeta']['numero']);
          this.formNuevaOT.controls["TarjetaId"].setValue(this.nueva['Tarjeta']['id']);
          
          this.cancelAddNumeroTarjeta()
          
          console.log('tarjeta nueva asignada: ', this.formNuevaOT.controls["tarjeta"].value)

        }
        
        }else{
          countObs++;
          console.log('count: ',countObs)
          if(countObs==10){this.cancelAddNumeroTarjeta();}
        }
      })
    })
  }

  cancelAddNumeroTarjeta(){
    document.getElementById('addNumeroTarjeta').setAttribute('disabled','false');
    document.getElementById('cancelAddNumeroTarjeta').setAttribute('disabled','true');
    this.unsubscribe()
  }

  limpiarTarjeta(){
    this.formNuevaOT.controls["tarjeta"].setValue('');
  }

  async openModalClientes(){

    const modalClientes = await this.modalCtrl.create({
      component: NuevoComponent,
    });
    modalClientes.present();

    const { data, role } = await modalClientes.onWillDismiss();
    if (role === 'confirm') {
      console.log (data);
    this.formNuevaOT.controls["ClienteId"].setValue(data.id);
    this.cliente = data;
    console.log('this.cliente', this.cliente);

    }

  }

  async openModalMotos(){

    const modalMotos = await this.modalCtrl.create({
      component: BuscaragregarmotoComponent,
    });
    modalMotos.present();

    const { data, role } = await modalMotos.onWillDismiss();
    if (role === 'confirm') {
      console.log ('data',data);
    this.formNuevaOT.controls["MotoId"].setValue(data.id);
    this.moto = data;
    console.log('this.moto', this.moto);

    }

  }

  /**
   * Limpiar formulario formNuevaOT
   */
  resetForm(action: string){
    // limpiar campos
    this.formNuevaOT.reset();

    // limpiar validaciones
    Object.keys(this.formNuevaOT.controls).forEach(key => {
      this.formNuevaOT.get(key).setErrors(null) ;
    });

    // limpiar objetos nueva,cliente,moto
    this.nueva = {}
    if(action=='limpiar'){
      this.cliente = [];
      this.moto = [];
    }

  }
  private unsubscribe(){
    if (this.subscription){
      this.subscription.unsubscribe()
      console.log('unsuscribe')
    }
  }

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe()
      console.log('unsubscribe onDestroy')
    }
  }

  /**
   * Diálogo de confirmación
   */
  async presentAlertConfirm(action: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea confirmar nueva orden?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirm Okay');
            this.agregarOT(action);
            
          }
        }
      ]
    });

    await alert.present();


  }

  limpiarForm(){
    this.router.navigate(['ordentrabajo/nueva/refresh']);
  }


}
