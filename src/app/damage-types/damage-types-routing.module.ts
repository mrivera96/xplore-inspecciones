import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamageTypesPage } from './damage-types.page';

const routes: Routes = [
  {
    path: '',
    component: DamageTypesPage,
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./damage-type-detail/damage-type-detail.component').then(
        (m) => m.DamageTypeDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./damage-type-detail/damage-type-detail.component').then(
        (m) => m.DamageTypeDetailComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamageTypesPageRoutingModule {}
