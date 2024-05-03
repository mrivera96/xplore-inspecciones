import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { InspectionDetailPage } from './inspection-detail/inspection-detail.page';
import { InspectionsPageRoutingModule } from './inspections-routing.module';
import { InspectionsPage } from './inspections.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    InspectionsPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarComponent,
    InspectionDetailPage,
  ],
  declarations: [InspectionsPage],
  providers: [],
})
export class InspectionsPageModule {}
