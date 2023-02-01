import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.page.html',
  styleUrls: ['./retirar.page.scss'],
})
export class RetirarPage implements OnInit {
  formRetirarOT: FormGroup;
  OTaRetirar;
  Repuestos;
  subscription: Subscription
  isPrecioReadOnly=true


  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
  ) { 

    this.formRetirarOT = this.fb.group({
      'tarjeta': new FormControl(""),
      'precio': new FormControl(""),
      'entrega': new FormControl(""),
      'cancela': new FormControl(""),
      'fecha_entrega_estimada': new FormControl(""),
      'createdAt': new FormControl(""),
      'updatedAt': new FormControl(""),
      'observaciones': new FormControl(""),
      'saldo': new FormControl(""),
      'otpapel': new FormControl(""),


    })

  }

  ngOnInit() {
  }

  addNumeroTarjeta(){
    const fecha_desde = new Date()
    const intervalo = interval(2000);
    console.log('inicio busqueda', fecha_desde)
    this.subscription =  intervalo.subscribe(n=>{
      this.eventosService.getUltimoEventoByAccion(environment.ACCION_EN_USO, fecha_desde)
      .then(res=>{
        //this.ot = res
        if (res){
          this.OTaRetirar = res
          this.formRetirarOT.controls['entrega'].setValue(res['OrdenTrabajo']['entrega'])
          this.formRetirarOT.controls['precio'].setValue(res['OrdenTrabajo']['precio'])
          this.formRetirarOT.controls['fecha_entrega_estimada'].setValue(res['OrdenTrabajo']['fecha_entrega_estimada'])
          this.formRetirarOT.controls['tarjeta'].setValue(res['Tarjeta']['numero'])
          this.calcSaldo();

          this.Repuestos = this.OTaRetirar.OrdenTrabajo.Repuestos;
          console.log('Repuestos',this.Repuestos)

          console.log('res',res)
          console.log('this.OTaRetirar',this.OTaRetirar)

          this.unsubscribe();
        }
      })
    });
  }

  limpiarTarjeta(){
    this.formRetirarOT.controls['tarjeta'].setValue('')
    //this.ot['Tarjeta']='';
  }

  stopSearch(){
    this.unsubscribe();
    console.log('unsuscribe')

  }

  private unsubscribe(){
    if (this.subscription){
      this.subscription.unsubscribe()
      console.log('unsuscribe')
    }
  }
  calcSaldo(){
    this.formRetirarOT.controls['saldo']
    .setValue(
      this.formRetirarOT.controls['precio'].value 
      - this.formRetirarOT.controls['entrega'].value
      - this.formRetirarOT.controls['cancela'].value
      );
  }
  cantelaTotalSaldo(){
    this.formRetirarOT.controls['cancela']
    .setValue(
      this.formRetirarOT.controls['precio'].value 
      - this.formRetirarOT.controls['entrega'].value
      );
  }

  modificarPrecio(){
    this.isPrecioReadOnly=!this.isPrecioReadOnly;
  }


  onSubmit(){
    this.unsubscribe();
    

    if (this.formRetirarOT.valid){
      console.log(this.formRetirarOT.value)
    }
  }



}
