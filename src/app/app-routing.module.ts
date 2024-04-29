import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserGuard } from './shared/guards/user.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { InspectionGuard } from './shared/guards/inspection.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [UserGuard],
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },

  {
    path: 'inspection-review',
    loadChildren: () =>
      import('./inspection-review/inspection-review.module').then(
        (m) => m.InspectionReviewPageModule
      ),
    canActivate: [UserGuard, InspectionGuard],
  },
  {
    path: 'inspection',
    loadChildren: () =>
      import('./inspections/inspection.module').then(
        (m) => m.InspectionPageModule
      ),
    canActivate: [UserGuard],
  },
  {
    path: '**',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
