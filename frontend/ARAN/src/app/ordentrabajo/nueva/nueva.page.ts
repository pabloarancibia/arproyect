import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NuevaOTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { interval, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    private nuevaOTService: NuevaOTService,
    private eventosService: EventosService
    ) { 

    this.formNuevaOT = this.fb.group({
      'tarjeta': new FormControl(""),
      'otpapel': new FormControl(""),
      'trabajo': new FormControl(""),
      
      'cliente': new FormControl("",),
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
    
      const nuevaOT = this.formNuevaOT.value;  
      
      // check datas
      if (nuevaOT.fecha_entrega_estimada.value == "" || 
      !nuevaOT.fecha_entrega_estimada.value ||
      nuevaOT.fecha_entrega_estimada.value == null){
        nuevaOT.fecha_entrega_estimada = this.now;
      }
      if (nuevaOT.tarjeta.value == "" || 
      !nuevaOT.tarjeta.value ||
      nuevaOT.tarjeta.value == null){
        nuevaOT.tarjeta = environment.NO_ASIGNADA;
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
    const intervalo = interval(2000);
    document.getElementById('addNumeroTarjeta').setAttribute('disabled','true');
    document.getElementById('cancelAddNumeroTarjeta').setAttribute('disabled','false');

    this.subscription =  intervalo.subscribe(n=>{
      'buscar numero tarjeta'
      this.eventosService.getUltimoEventoByAccion(environment.ACCION_NUEVA, fecha_desde)
      .then(res=>{
        this.nueva = res
        console.log('último evento',this.nueva[0]['numero'])
        console.log('tarjeta actual',this.formNuevaOT.controls["tarjeta"].value)
        if (this.nueva[0]['numero'] !== this.formNuevaOT.controls["tarjeta"].value){
          this.formNuevaOT.controls["tarjeta"].setValue(this.nueva[0]['numero']);
          this.subscription.unsubscribe()
          document.getElementById('addNumeroTarjeta').setAttribute('disabled','false');
          document.getElementById('cancelAddNumeroTarjeta').setAttribute('disabled','true');

          console.log('tarjeta nueva asignada')
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

}
