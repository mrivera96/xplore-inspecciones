import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoPartsPage } from './auto-parts.page';

const routes: Routes = [
  {
    path: '',
    component: AutoPartsPage,
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./auto-part-detail/auto-part-detail.component').then(
        (m) => m.AutoPartDetailComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./auto-part-detail/auto-part-detail.component').then(
        (m) => m.AutoPartDetailComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoPartsPageRoutingModule {}
