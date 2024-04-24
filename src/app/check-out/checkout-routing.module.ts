import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPage } from './checkout.page';
import { DamagesComponent } from './components/damages/damages.component';
import { UserGuard } from '../shared/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: CheckoutPage,
    canActivate:[UserGuard]

  },
  {
    path: 'damages',
    component: DamagesComponent,
    canActivate:[UserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule {}
