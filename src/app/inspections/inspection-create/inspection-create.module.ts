import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InspectionCreatePageRoutingModule } from './inspection-create-routing.module';
import { InspectionCreatePage } from './inspection-create.page';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxIonicImageViewerModule } from '@herdwatch-apps/ngx-ionic-image-viewer';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    InspectionCreatePageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IonicSelectableComponent,
    ToolbarComponent,
    FontAwesomeModule,
    NgxIonicImageViewerModule
  ],
  declarations: [InspectionCreatePage],
  providers: [],
})
export class InspectionCreatePageModule {}
