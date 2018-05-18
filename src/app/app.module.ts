import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ChampionsComponent } from './champions/champions.component';
import { WinnersComponent } from './winners/winners.component';

@NgModule({
  declarations: [
    AppComponent,
    ChampionsComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
