import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { interval, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { NuevoComponent } from 'src/app/cliente/nuevo/nuevo.component';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.page.html',
  styleUrls: ['./nueva.page.scss'],
})
export class NuevaPage implements OnInit {

  formNuevaOT: FormGroup;
  isAddMode: boolean =  true;
  now = new Date();
  nueva = {}

  subscription: Subscription 

  constructor(
    private fb: FormBuilder,
    private nuevaOTService: OTService,
    private eventosService: EventosService,
    private modalCtrl: ModalController
    ) { 

    this.formNuevaOT = this.fb.group({
      'tarjeta': new FormControl(""),
      'TarjetaId': new FormControl(""),
      'ordenPapel': new FormControl(""),
      'trabajo': new FormControl(""),
      
      'cliente': new FormControl(""),
      'moto': new FormControl(""),
      'repuestos': new FormControl(""),

      'detalle': new FormControl(""),
      'precio': new FormControl(""),
      'entrega': new FormControl(""),
      'saldo': new FormControl(""),

      'fecha_entrega_estimada': new FormControl("",),

      'estado': new FormControl(""),
    })
   }


  ngOnInit() {
    this.isAddMode = true;
  }

  onSubmit(){
    if (this.isAddMode){
      this.agregarOT();
    }
    if (!this.isAddMode){
      console.log('this.editarOT()');
    }
  }

  private agregarOT(){
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

      // send data
      this.nuevaOTService.nuevaOTService(nuevaOT)
        .then(res=>{
          console.log('envio data nueva ot ok, res: ', res);
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

    this.subscription =  intervalo.subscribe(n=>{
      'buscar numero tarjeta'
      this.eventosService.getUltimoEventoByAccion(environment.ACCION_NUEVA, fecha_desde)
      .then(res=>{
        console.log('res ', res)
        this.nueva = res
        if (this.nueva){
          console.log('último evento, tarjeta n: ',this.nueva['Tarjeta']['numero'])
          console.log('último evento tarjeta id: ',this.nueva['Tarjeta']['id'])
        console.log('tarjeta actual: ',this.formNuevaOT.controls["tarjeta"].value)
        if (this.nueva['Tarjeta']['numero']!== this.formNuevaOT.controls["tarjeta"].value){
          this.formNuevaOT.controls["tarjeta"].setValue(this.nueva['Tarjeta']['numero']);
          this.formNuevaOT.controls["TarjetaId"].setValue(this.nueva['Tarjeta']['id']);
          
          this.subscription.unsubscribe()
          
          document.getElementById('addNumeroTarjeta').setAttribute('disabled','false');
          document.getElementById('cancelAddNumeroTarjeta').setAttribute('disabled','true');

          console.log('tarjeta nueva asignada: ', this.formNuevaOT.controls["tarjeta"].value)

        }
        
        }
      })
    })
  }

  cancelAddNumeroTarjeta(){
    document.getElementById('addNumeroTarjeta').setAttribute('disabled','false');
    document.getElementById('cancelAddNumeroTarjeta').setAttribute('disabled','true');
    this.subscription.unsubscribe()
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
    this.formNuevaOT.controls["cliente"].setValue(data.id);

    }

  }

}
