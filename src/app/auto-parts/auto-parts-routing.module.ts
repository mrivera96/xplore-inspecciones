import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoPartsPage } from './auto-parts.page';

const routes: Routes = [
  {
    path: '',
    component: AutoPartsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoPartsPageRoutingModule {}
