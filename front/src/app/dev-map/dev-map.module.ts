import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevMapPageRoutingModule } from './dev-map-routing.module';

import { DevMapPage } from './dev-map.page';

import {ComponentsModule} from '../shared/components/components.module';

import { HighchartsChartModule} from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevMapPageRoutingModule,
    ComponentsModule,
    HighchartsChartModule
  ],
  declarations: [DevMapPage]
})
export class DevMapPageModule {}
