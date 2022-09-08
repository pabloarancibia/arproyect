import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdentrabajoRoutingModule } from './ordentrabajo-routing.module';
import { NuevaPage } from './nueva/nueva.page';
import { ListarPage } from './listar/listar.page';


@NgModule({
  declarations: [
    NuevaPage,
    ListarPage
  ],
  imports: [
    CommonModule,
    OrdentrabajoRoutingModule
  ]
})
export class OrdentrabajoModule { }
