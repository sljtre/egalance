import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';

import {ComponentsModule} from '../shared/components/components.module';

import {SaisonsComponent} from './saisons/saisons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [GamePage, SaisonsComponent]
})
export class GamePageModule {}
