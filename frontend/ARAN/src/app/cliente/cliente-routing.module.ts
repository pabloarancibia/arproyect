import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePage } from './cliente.page';
import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  {
    path: '',
    component: NuevoComponent
  },
  {
    path: 'buscaragregar',
    component: NuevoComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePageRoutingModule {}
