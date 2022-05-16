import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplanationsPageRoutingModule } from './explanations-routing.module';

import { ExplanationsPage } from './explanations.page';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplanationsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ExplanationsPage]
})
export class ExplanationsPageModule {}
