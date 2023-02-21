import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotoRoutingModule } from './moto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BuscaragregarmotoComponent } from './buscaragregarmoto/buscaragregarmoto.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    BuscaragregarmotoComponent
  ],
  imports: [
    CommonModule,
    MotoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    IonicModule
  ]
})
export class MotoModule { }
