import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CheckoutPage } from './checkout.page';

import { IonicSelectableComponent } from 'ionic-selectable';
import { CheckoutPageRoutingModule } from './checkout-routing.module';
import { DamagePhotosComponent } from './components/damage-photos/damage-photos.component';
import { DamagesComponent } from './components/damages/damages.component';
import { GeneralDataComponent } from './components/general-data/general-data.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
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
    DamagePhotosComponent,
    AccessoriesComponent,
  ],
  declarations: [CheckoutPage],
  providers: [],
})
export class CheckoutPageModule {}
