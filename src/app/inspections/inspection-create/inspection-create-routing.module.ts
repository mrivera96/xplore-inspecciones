import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InspectionCreatePage } from './inspection-create.page';
import { DamagesComponent } from './components/damages/damages.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { SigningComponent } from './components/signing/signing.component';
import { UserGuard } from 'src/app/shared/guards/user.guard';
import { InspectionGuard } from 'src/app/shared/guards/inspection.guard';

const routes: Routes = [
  {
    path: '',
    component: InspectionCreatePage,
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
export class InspectionCreatePageRoutingModule {}
