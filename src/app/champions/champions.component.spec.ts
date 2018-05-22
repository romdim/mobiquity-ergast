import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
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

import { ChampionsComponent } from './champions.component';
import { ErgastService } from '../shared/ergast.service';
import { Champion } from '../shared/models/champion.model';
import { LoaderService } from '../shared/loader.service';

describe('ChampionsComponent', () => {
  let component: ChampionsComponent;
  let fixture: ComponentFixture<ChampionsComponent>;
  let service: ErgastService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,

        BrowserAnimationsModule,
        MatBadgeModule,
        MatToolbarModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatListModule,
        MatDividerModule
      ],
      declarations: [ ChampionsComponent ],
      providers: [
        ErgastService,
        LoaderService
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(ChampionsComponent);
      component = fixture.componentInstance;
      service = TestBed.get(ErgastService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();
    expect(service instanceof ErgastService).toBeTruthy();
  });

  it('should get all champions from 2005 to 2015 (11)', () => {
    fixture.detectChanges();
    expect(component.champions.length).toEqual(11);
  });
});
