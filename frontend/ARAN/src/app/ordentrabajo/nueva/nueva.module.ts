import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaPageRoutingModule } from './nueva-routing.module';

import { NuevaPage } from './nueva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NuevaPage]
})
export class NuevaPageModule {}
