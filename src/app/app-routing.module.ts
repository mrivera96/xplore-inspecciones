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
    path: 'damage-types',
    loadChildren: () =>
      import('./damage-types/damage-types.module').then(
        (m) => m.DamageTypesPageModule
      ),
    canActivate: [UserGuard],
  },
  {
    path: 'auto-parts',
    loadChildren: () =>
      import('./auto-parts/auto-parts.module').then(
        (m) => m.AutoPartsPageModule
      ),
    canActivate: [UserGuard],
  },
  {
    path: 'accessories',
    loadChildren: () =>
      import('./accessories/accessories.module').then(
        (m) => m.AccessoriesPageModule
      ),
    canActivate: [UserGuard],
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
