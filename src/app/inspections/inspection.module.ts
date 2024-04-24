import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InspectionPage } from './inspection.page';

import { IonicSelectableComponent } from 'ionic-selectable';
import { InspectionPageRoutingModule } from './inspection-routing.module';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { DamagePhotosComponent } from './components/damage-photos/damage-photos.component';
import { DamagesComponent } from './components/damages/damages.component';
import { SigningComponent } from './components/signing/signing.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    InspectionPageRoutingModule,
    IonicSelectableComponent,
    DamagesComponent,
    DamagePhotosComponent,
    AccessoriesComponent,
    SigningComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [InspectionPage],
  providers: [],
})
export class InspectionPageModule {}
