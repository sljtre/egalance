import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplanationsPage } from './explanations.page';

const routes: Routes = [
  {
    path: '',
    component: ExplanationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplanationsPageRoutingModule {}
