import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DamageTypesPageRoutingModule } from './damage-types-routing.module';

import { DamageTypesPage } from './damage-types.page';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DamageTypesPageRoutingModule,
    ToolbarComponent,
  ],
  declarations: [DamageTypesPage],
})
export class DamageTypesPageModule {}
