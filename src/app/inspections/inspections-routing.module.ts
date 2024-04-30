import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../shared/guards/user.guard';
import { InspectionsPage } from './inspections.page';

const routes: Routes = [
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
    path: 'create',
    loadChildren: () =>
      import('./inspection-create/inspection-create.module').then(
        (m) => m.InspectionCreatePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionsPageRoutingModule {}
