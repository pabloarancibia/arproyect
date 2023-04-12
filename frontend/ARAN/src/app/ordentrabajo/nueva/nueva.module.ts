import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NuevaPageRoutingModule } from './nueva-routing.module';
import { NuevaPage } from './nueva.page';
import { ClientePageModule } from 'src/app/cliente/cliente.module';
//import { NuevoComponent } from 'src/app/cliente/nuevo/nuevo.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from 'src/app/material.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaPageRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MaterialModule,
    ClientePageModule,
    //NuevoComponent,
  ],
  declarations: [
    NuevaPage,
    // NuevoComponent,
  ]
})
export class NuevaPageModule {}
