import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitySelectionPage } from './city-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CitySelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitySelectionPageRoutingModule {}
