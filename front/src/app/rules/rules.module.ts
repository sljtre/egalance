import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RulesPageRoutingModule } from './rules-routing.module';

import { RulesPage } from './rules.page';

import {ComponentsModule} from '../shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RulesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RulesPage]
})
export class RulesPageModule {}
