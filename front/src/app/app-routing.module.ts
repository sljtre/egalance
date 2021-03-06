import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'scoreboard',
    loadChildren: () => import('./scoreboard/scoreboard.module').then( m => m.ScoreboardPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'conf-account',
    loadChildren: () => import('./conf-account/conf-account.module').then( m => m.ConfAccountPageModule)
  },
  {
    path: 'city-selection',
    loadChildren: () => import('./city-selection/city-selection.module').then( m => m.CitySelectionPageModule)
  },
  {
    path: 'customization',
    loadChildren: () => import('./customization/customization.module').then( m => m.CustomizationPageModule)
  },
  {
    path: 'explanations',
    loadChildren: () => import('./explanations/explanations.module').then( m => m.ExplanationsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
