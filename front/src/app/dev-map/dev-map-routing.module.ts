import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevMapPage } from './dev-map.page';

const routes: Routes = [
  {
    path: '',
    component: DevMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevMapPageRoutingModule {}
