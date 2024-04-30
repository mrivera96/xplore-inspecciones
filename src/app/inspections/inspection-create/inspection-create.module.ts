import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InspectionCreatePageRoutingModule } from './inspection-create-routing.module';
import { InspectionCreatePage } from './inspection-create.page';
import { IonicSelectableComponent } from 'ionic-selectable';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    InspectionCreatePageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IonicSelectableComponent
  ],
  declarations: [InspectionCreatePage],
  providers: [],
})
export class InspectionCreatePageModule {}
