import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdentrabajoPage } from './ordentrabajo.page';

const routes: Routes = [
  {
    path: '',
    component: OrdentrabajoPage
  },
  {
    path: 'nueva',
    loadChildren: () => import('./nueva/nueva.module').then( m => m.NuevaPageModule)
  },
  {
    path: 'retirar',
    loadChildren: () => import('./retirar/retirar.module').then( m => m.RetirarPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./listar/listar.module').then( m => m.ListarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdentrabajoPageRoutingModule {}
