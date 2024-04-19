import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutPage } from './checkout.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CheckoutPageRoutingModule } from './checkout-routing.module';
import { IonicSelectableComponent } from 'ionic-selectable';
import { GeneralDataComponent } from './components/general-data/general-data.component';
import { DamagesComponent } from './components/damages/damages.component';
import { DamagePhotosComponent } from './components/damage-photos/damage-photos.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CheckoutPageRoutingModule,
    IonicSelectableComponent,
    GeneralDataComponent,
    DamagesComponent,
    DamagePhotosComponent
  ],
  declarations: [CheckoutPage],
  providers: [],
})
export class CheckoutPageModule {}
