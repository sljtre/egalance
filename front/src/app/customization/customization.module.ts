import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomizationPageRoutingModule } from './customization-routing.module';

import { CustomizationPage } from './customization.page';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomizationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CustomizationPage]
})
export class CustomizationPageModule {}
