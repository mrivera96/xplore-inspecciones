import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckoutPage } from './checkout.page';

import { IonicSelectableComponent } from 'ionic-selectable';
import { CheckoutPageRoutingModule } from './checkout-routing.module';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { DamagePhotosComponent } from './components/damage-photos/damage-photos.component';
import { DamagesComponent } from './components/damages/damages.component';
import { GeneralDataComponent } from './components/general-data/general-data.component';
import { SigningComponent } from './components/signing/signing.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CheckoutPageRoutingModule,
    IonicSelectableComponent,
    GeneralDataComponent,
    DamagesComponent,
    DamagePhotosComponent,
    AccessoriesComponent,
    SigningComponent,
    ReactiveFormsModule,
  ],
  declarations: [CheckoutPage],
  providers: [],
})
export class CheckoutPageModule {}
