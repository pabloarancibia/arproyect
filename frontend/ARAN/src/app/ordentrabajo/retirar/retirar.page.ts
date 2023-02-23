import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { OTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';
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
    private router: Router,
    private eventosService: EventosService,
    private otService: OTService,
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

          // guardo los valores 
          this.OTaRetirar = res

          // asigno los valores al formulario
          this.formRetirarOT.controls['entrega'].setValue(res['OrdenTrabajo']['entrega'])
          this.formRetirarOT.controls['precio'].setValue(res['OrdenTrabajo']['precio'])
          this.formRetirarOT.controls['fecha_entrega_estimada'].setValue(res['OrdenTrabajo']['fecha_entrega_estimada'])
          this.formRetirarOT.controls['tarjeta'].setValue(res['Tarjeta']['numero'])

          // calculo el saldo para mostrar en el formulario
          this.calcSaldo();

          // asigno repuestos 
          this.Repuestos = this.OTaRetirar.OrdenTrabajo.Repuestos;
          //console.log('Repuestos',this.Repuestos)

          console.log('res',res)
          console.log('this.OTaRetirar',this.OTaRetirar)

          // llamo a metodo para desuscribirme
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
      console.log(this.OTaRetirar)

      // Preparo string detalle
      const timestamp_today = new Date()
      const detalle:string =
        '\n----------------\n----------------\n'+
        this.OTaRetirar.OrdenTrabajo.detalle 
        + '\n---\n '+ 
        'Datos del retiro del día: '+timestamp_today 
        + ':\nObservaciones: ' +
        this.formRetirarOT.controls['observaciones'].value 
        + '\n---\n ' +
        'precio anterior: ' + this.OTaRetirar.OrdenTrabajo.precio 
        + '\n' +
        'entrega anterior: ' + this.formRetirarOT.controls['entrega'].value
        + '\n' +
        'entrega realizada el día del retiro: ' + this.formRetirarOT.controls['cancela'].value
        + '\n----------------\n----------------\n'



      // Preparo datos para enviar
      const data = 
        {
          precio: this.formRetirarOT.controls['precio'].value,
          entrega: this.formRetirarOT.controls['entrega'].value + this.formRetirarOT.controls['cancela'].value,
          estado: environment.ESTADO_RETIRAR,
          detalle: detalle,
          TarjetaId: this.OTaRetirar.Tarjeta.id,
          TarjetaEstado: environment.TARJETA_LIBRE
        }

        console.log('datos para enviar \n ORDEN ID: ',this.OTaRetirar.OrdenTrabajo.id,'DATA \n', data)

      // Envio datos de la orden y tarjeta para actualizar
      this.otService.putRetirarOTyTarjeta(
        this.OTaRetirar.OrdenTrabajo.id,
        data
      ).then(res=>{
        console.log('respuesta retirar: ', res);
        //this.resetForm()
        this.router.navigate(['ordentrabajo/retirar/refresh']);


      }).catch(err => console.error(err));

      // enviar OT id, precio,saldo, detalle(observaciones), estado='retirado'
      // TarjetaId, TarjetaEstado='libre'
    };
  }

}
