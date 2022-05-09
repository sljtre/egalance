import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitySelectionPageRoutingModule } from './city-selection-routing.module';

import { CitySelectionPage } from './city-selection.page';
import { ComponentsModule } from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitySelectionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CitySelectionPage]
})
export class CitySelectionPageModule {}
