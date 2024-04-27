import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { InspectionGuard } from '../shared/guards/inspection.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'inspection',
        loadChildren: () =>
          import('../inspections/inspection.module').then(
            (m) => m.InspectionPageModule
          ),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../settings/settings.module').then((m) => m.SettingsPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
