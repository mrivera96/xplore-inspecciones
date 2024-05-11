import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamageTypesPage } from './damage-types.page';

const routes: Routes = [
  {
    path: '',
    component: DamageTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamageTypesPageRoutingModule {}
