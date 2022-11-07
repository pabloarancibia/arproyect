import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.page.html',
  styleUrls: ['./nueva.page.scss'],
})
export class NuevaPage implements OnInit {

  formNuevaOT: FormGroup;
  saldo;

  constructor(public fb: FormBuilder) {

    this.formNuevaOT = this.fb.group({
      'tarjeta': new FormControl(""),
      'trabajo': new FormControl(""),
      'otpapel': new FormControl(""),
      'cliente': new FormControl(""),
      'moto': new FormControl(""),

      'detalle': new FormControl(""),
      'precio': new FormControl(""),
      'entrega': new FormControl(""),
      'saldo': new FormControl(""),

      'fecha_estimada': new FormControl(""),
    })
   }


  ngOnInit() {

  }

  calcSaldo(){
    //this.formNuevaOT['saldo'] = this.formNuevaOT['precio'];
    this.formNuevaOT.controls['saldo'].setValue(this.formNuevaOT.controls['precio'].value - this.formNuevaOT.controls['entrega'].value);
  }

}
