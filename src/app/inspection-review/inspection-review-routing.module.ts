import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionReviewPage } from './inspection-review.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionReviewPageRoutingModule {}
