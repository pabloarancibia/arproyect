import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NuevaOTService } from 'src/app/services/ordenTrabajoServices/ordentrabajo.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.page.html',
  styleUrls: ['./nueva.page.scss'],
})
export class NuevaPage implements OnInit {

  formNuevaOT: FormGroup;
  isAddMode: boolean =  true;
  now = new Date();

  constructor(
    private fb: FormBuilder,
    private nuevaOTService: NuevaOTService
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
    const intervalo = interval(2000);

    intervalo.subscribe(n=>{
      'buscar numero tarjeta'
      // si tarjeta res = actual no hago nada
      // si tarjeta res != actual la cargo
    })

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
      this.formNuevaOT.controls["estado"].setValue('espera');
    
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
        nuevaOT.tarjeta = 'no_asignada';
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

}
