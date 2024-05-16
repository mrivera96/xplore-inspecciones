import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessoriesPage } from './accessories.page';

const routes: Routes = [
  {
    path: '',
    component: AccessoriesPage,
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./accessory-detail/accessory-detail.component').then(
        (m) => m.AccessoryDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./accessory-detail/accessory-detail.component').then(
        (m) => m.AccessoryDetailComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessoriesPageRoutingModule {}
