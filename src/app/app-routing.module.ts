import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginGuard } from './shared/guards/login.guard';
import { UserGuard } from './shared/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [UserGuard],
  },
  {
    path: 'inspections',
    loadChildren: () =>
      import('./inspections/inspections.module').then(
        (m) => m.InspectionsPageModule
      ),
    canActivate: [UserGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },

  {
    path: '**',
    redirectTo: 'home',
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
