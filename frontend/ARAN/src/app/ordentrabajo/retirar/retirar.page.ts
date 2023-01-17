import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
    private eventosService: EventosService,
  ) { 

  }

  ngOnInit() {
  }

  addNumeroTarjeta(){
    const fecha_desde = new Date()
    const intervalo = interval(2000);
    this.subscription =  intervalo.subscribe(n=>{
      this.eventosService.getUltimoEventoByAccion(environment.ACCION_EN_USO, fecha_desde)
      .then(res=>{
        this.ot = res
        if (this.ot){
          console.log(res)
          console.log('último evento',this.ot[0]['numero'])
        }
      })
    });
  }

  limpiarTarjeta(){
    this.ot['Tarjeta']='';
  }

  stopSearch(){
    this.subscription.unsubscribe()
  }

}
