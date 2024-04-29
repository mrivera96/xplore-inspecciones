import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionReviewPageRoutingModule } from './inspection-review-routing.module';

import { InspectionReviewPage } from './inspection-review.page';

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
