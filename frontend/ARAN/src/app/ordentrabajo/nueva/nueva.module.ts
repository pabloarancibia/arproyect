import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NuevaPageRoutingModule } from './nueva-routing.module';
import { NuevaPage } from './nueva.page';
import { NuevoComponent } from 'src/app/cliente/nuevo/nuevo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    NuevaPage,
    NuevoComponent,
  ]
})
export class NuevaPageModule {}
