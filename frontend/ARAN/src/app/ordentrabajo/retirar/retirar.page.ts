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
  ot = {}
  subscription: Subscription


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
          console.log('res',res)
          this.formRetirarOT.controls['entrega'].setValue(res['OrdenTrabajo']['entrega'])
          this.formRetirarOT.controls['tarjeta'].setValue(res['Tarjeta']['numero'])
          console.log('res',res)
          //console.log('this.ot',this.ot)
          //console.log('último evento',this.ot[0]['Tarjeta.numero'])
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
  }

  private unsubscribe(){
    if (this.subscription){
      this.subscription.unsubscribe()
      console.log('unsuscribe')
    }
  }
  cantelaTotalSaldo(){
    alert('cancelar total');
  }
  modificarPrecio(){
    alert('modificar Precio');
  }

  onSubmit(){
    this.unsubscribe();
    

    if (this.formRetirarOT.valid){
      console.log(this.formRetirarOT.value)
    }
  }



}
