import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../shared/guards/user.guard';
import { InspectionsPage } from './inspections.page';
import { InspectionDetailPage } from './inspection-detail/inspection-detail.page';
import { InspectionGuard } from '../shared/guards/inspection.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'checkout',
    component: InspectionsPage,
    canActivate: [UserGuard],
  },
  {
    path: 'checkin',
    component: InspectionsPage,
    canActivate: [UserGuard],
  },
  {
    path: 'detail',
    component: InspectionDetailPage,
    canActivate: [UserGuard, InspectionGuard],
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./inspection-create/inspection-create.module').then(
        (m) => m.InspectionCreatePageModule
      ),
    canActivate: [InspectionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionsPageRoutingModule {}
