import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPage } from './checkout.page';
import { DamagesComponent } from './components/damages/damages.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
