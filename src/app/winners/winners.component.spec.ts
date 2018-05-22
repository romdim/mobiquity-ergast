import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
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

import { WinnersComponent } from './winners.component';
import { ErgastService } from '../shared/ergast.service';
import { Champion } from '../shared/models/champion.model';
import { Winner } from '../shared/models/winner.model';
import { OrdinalPipe } from '../shared/ordinal.pipe';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { LoaderService } from '../shared/loader.service';

describe('WinnersComponent', () => {
  const activatedRoute = new ActivatedRouteStub();
  let component: WinnersComponent;
  let fixture: ComponentFixture<WinnersComponent>;
  let service: ErgastService;

  beforeEach(async(() => {
    activatedRoute.setParamMap({ season: '2005' });
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
      declarations: [
        WinnersComponent,
        OrdinalPipe
      ],
      providers: [
        ErgastService,
        LoaderService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(WinnersComponent);
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

  it('should get all winners for 2005 (19)', () => {
    fixture.detectChanges();
    expect(component.winners.length).toEqual(19);
  });

  it('should get all champion for 2005 (1)', () => {
    fixture.detectChanges();
    expect(component.champion.driver.getFullName()).toEqual('Fernando Alonso');
  });
});
