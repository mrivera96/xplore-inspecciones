import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionPage } from './inspection.page';
import { DamagesComponent } from './components/damages/damages.component';
import { UserGuard } from '../shared/guards/user.guard';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { SigningComponent } from './components/signing/signing.component';
import { InspectionGuard } from '../shared/guards/inspection.guard';

const routes: Routes = [
  {
    path: '',
    component: InspectionPage,
    canActivate: [UserGuard],
  },
  {
    path: 'damages',
    component: DamagesComponent,
    canActivate: [UserGuard, InspectionGuard],
  },
  {
    path: 'accessories',
    component: AccessoriesComponent,
    canActivate: [UserGuard, InspectionGuard],
  },
  {
    path: 'signing',
    component: SigningComponent,
    canActivate: [UserGuard, InspectionGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionPageRoutingModule {}
