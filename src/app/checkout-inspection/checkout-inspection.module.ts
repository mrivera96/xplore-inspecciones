import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutInspectionPage } from './checkout-inspection.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CheckoutInspectionPageRoutingModule } from './checkout-inspection-routing.module';
import { IonicSelectableComponent } from 'ionic-selectable';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CheckoutInspectionPageRoutingModule,
    IonicSelectableComponent,
  ],
  declarations: [CheckoutInspectionPage],
  providers: [],
})
export class CheckoutInspectionPageModule {}
