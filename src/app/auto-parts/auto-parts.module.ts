import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoPartsPageRoutingModule } from './auto-parts-routing.module';

import { AutoPartsPage } from './auto-parts.page';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoPartsPageRoutingModule,
    ToolbarComponent,
  ],
  declarations: [AutoPartsPage]
})
export class AutoPartsPageModule {}
