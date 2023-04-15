import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RepuestoRoutingModule } from './repuesto-routing.module';
import { NuevoRepuestoComponent } from './nuevo-repuesto/nuevo-repuesto.component';


@NgModule({
  declarations: [NuevoRepuestoComponent],
  imports: [
    CommonModule,
    IonicModule,
    RepuestoRoutingModule
  ]
})
export class RepuestoModule { }
