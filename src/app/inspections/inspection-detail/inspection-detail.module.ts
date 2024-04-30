import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionReviewPageRoutingModule } from './inspection-detail-routing.module';

import { InspectionReviewPage } from './inspection-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionReviewPageRoutingModule
  ],
  declarations: [InspectionReviewPage]
})
export class InspectionReviewPageModule {}
