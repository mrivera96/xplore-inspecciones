import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InspectionsPageRoutingModule } from './inspections-routing.module';
import { InspectionsPage } from './inspections.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    InspectionsPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [InspectionsPage],
  providers: [],
})
export class InspectionsPageModule {}
