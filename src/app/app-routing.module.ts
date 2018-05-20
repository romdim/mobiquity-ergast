import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChampionsComponent } from './champions/champions.component';
import { WinnersComponent } from './winners/winners.component';

const routes: Routes = [
  { path: '', redirectTo: '/champions', pathMatch: 'full' },
  { path: 'champions', component: ChampionsComponent },
  { path: ':season/winners', component: WinnersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
