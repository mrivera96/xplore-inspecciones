import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InspectionGuard } from 'src/app/shared/guards/inspection.guard';
import { UserGuard } from 'src/app/shared/guards/user.guard';
import { InspectionCreatePage } from './inspection-create.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionCreatePage,
    canActivate: [UserGuard],
  },
  {
    path: 'photos',
    loadComponent: () =>
      import('./components/photos/photos.component').then(
        (m) => m.PhotosComponent
      ),
    canActivate: [UserGuard, InspectionGuard],
  },
  {
    path: 'accessories',
    loadComponent: () =>
      import('./components/accessories/accessories.component').then(
        (m) => m.AccessoriesComponent
      ),
    canActivate: [UserGuard, InspectionGuard],
  },
  {
    path: 'signing',
    loadComponent: () =>
      import('./components/signing/signing.component').then(
        (m) => m.SigningComponent
      ),
    canActivate: [UserGuard, InspectionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionCreatePageRoutingModule {}
