import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NuevaOTServiceService } from 'src/app/services/ordenTrabajoServices/nueva-otservice.service';

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
    private nuevaOTServiceService: NuevaOTServiceService
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
      // set values
      this.formNuevaOT.controls["estado"].setValue('espera');
      
      if (this.formNuevaOT.controls["fecha_entrega_estimada"].value == "" || 
      !this.formNuevaOT.controls["fecha_entrega_estimada"].value ||
      this.formNuevaOT.controls["fecha_entrega_estimada"].value == null){

        this.formNuevaOT.controls["fecha_entrega_estimada"].setValue(this.now)
      }


      const nuevaOT = this.formNuevaOT.value;   

      // send data
      this.nuevaOTServiceService.nuevaOTService(nuevaOT)
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
