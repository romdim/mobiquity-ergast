import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ChampionsComponent } from './champions.component';
import { ErgastService } from '../shared/ergast.service';
import { Champion } from '../shared/models/champion.model';

describe('ChampionsComponent', () => {
  let component: ChampionsComponent;
  let fixture: ComponentFixture<ChampionsComponent>;
  let service: ErgastService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [ ChampionsComponent ],
      providers: [
        ErgastService
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
