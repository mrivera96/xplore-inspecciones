import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutInspectionPage } from './checkout-inspection.page';

const routes: Routes = [
  {
    path: '',
    component: CheckoutInspectionPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutInspectionPageRoutingModule {}
