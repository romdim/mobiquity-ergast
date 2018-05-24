import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatBadgeModule,
  MatButtonModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ChampionsComponent } from './champions/champions.component';
import { WinnersComponent } from './winners/winners.component';
import { OrdinalPipe } from './shared/ordinal.pipe';
import { environment } from '../environments/environment';
import { LoaderService } from './shared/loader.service';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    ChampionsComponent,
    WinnersComponent,
    OrdinalPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,

    AgmCoreModule.forRoot({
      apiKey: environment.AgmApiKey
    }),

    ServiceWorkerModule.register('/mobiquity-ergast/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
