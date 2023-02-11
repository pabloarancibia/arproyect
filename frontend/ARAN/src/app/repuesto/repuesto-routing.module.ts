import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoRepuestoComponent } from './nuevo-repuesto/nuevo-repuesto.component';

const routes: Routes = [
  {
    path: '',
    component: NuevoRepuestoComponent
  },
  {
    path: 'nuevo',
    component: NuevoRepuestoComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepuestoRoutingModule { }
