import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdentrabajoPageRoutingModule } from './ordentrabajo-routing.module';

import { OrdentrabajoPage } from './ordentrabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdentrabajoPageRoutingModule,
  ],
  declarations: [OrdentrabajoPage]
})
export class OrdentrabajoPageModule {}
