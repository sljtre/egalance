import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevMapPageRoutingModule } from './dev-map-routing.module';

import { DevMapPage } from './dev-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevMapPageRoutingModule
  ],
  declarations: [DevMapPage]
})
export class DevMapPageModule {}
