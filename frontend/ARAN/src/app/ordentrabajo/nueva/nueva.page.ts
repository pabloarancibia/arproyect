import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.page.html',
  styleUrls: ['./nueva.page.scss'],
})
export class NuevaPage implements OnInit {

  formNuevaOT: FormGroup;

  constructor(public fb: FormBuilder) {

    this.formNuevaOT = this.fb.group({
      'tarjeta': new FormControl(""),//cliente+moto+trabajo
      'detalle': new FormControl(""),//cliente+moto+trabajo
      'precio': new FormControl(""),
      'entrega': new FormControl(""),
      'fecha_estimada': new FormControl(""),
    })
   }

  ngOnInit() {
  }

}
