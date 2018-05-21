import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ErgastService } from './ergast.service';
import { Champion } from './models/champion.model';
import { Constructor } from './models/constructor.model';
import { Driver } from './models/driver.model';
import { Winner } from './models/winner.model';
import { ErgastMockService } from './ergast.mock.service';

describe('ErgastService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ErgastService;
  let driverAlo: Driver;
  let driverFis: Driver;
  let constructor: Constructor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: ErgastService, useClass: ErgastMockService } ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ErgastService);
    driverAlo = new Driver({
      code: 'ALO',
      dateOfBirth: '1981-07-29',
      driverId: 'alonso',
      givenName: 'Fernando',
      familyName: 'Alonso',
      nationality: 'Spanish',
      permanentNumber: '14',
      url: 'http://en.wikipedia.org/wiki/Fernando_Alonso'
    });
    driverFis = new Driver({
      code: 'FIS',
      dateOfBirth: '1973-01-14',
      driverId: 'fisichella',
      givenName: 'Giancarlo',
      familyName: 'Fisichella',
      nationality: 'Italian',
      url: 'http://en.wikipedia.org/wiki/Giancarlo_Fisichella'
    });
    constructor = new Constructor({
      constructorId: 'renault',
      name: 'Renault',
      nationality: 'French',
      url: 'http://en.wikipedia.org/wiki/Renault_F1'
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getChampion(2005)', () => {
    it('should return an Observable<Champion>', () => {
      const testData: Champion = new Champion({
        season: 2005,
        rounds: 19,
        wins: 7,
        points: 133,
        driver: driverAlo,
        constructorDetails: constructor
      });

      service.getChampion('2005')
        .subscribe(data => expect(data).toEqual(testData));
    });
  });

  describe('getChampions()', () => {
    it('should return an Observable<Champion[]>', () => {
      const testData: Champion[] = [
        new Champion({
          season: 2005,
          rounds: 19,
          wins: 7,
          points: 133,
          driver: driverAlo,
          constructorDetails: constructor
        }),
        new Champion({
          season: 2006,
          rounds: 18,
          wins: 7,
          points: 134,
          driver: driverAlo,
          constructorDetails: constructor
        })
      ];

      service.getChampions()
        .subscribe(data => expect(data).toEqual(testData));
    });
  });

  describe('getWinners(2005)', () => {
    it('should return an Observable<Winner[]>', () => {
      const testData: Winner[] = [
        new Winner({
          round: 1,
          raceName: 'Australian Grand Prix',
          raceUrl: 'http://en.wikipedia.org/wiki/2005_Australian_Grand_Prix',
          circuitName: 'Albert Park Grand Prix Circuit',
          circuitUrl: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
          locationLat: '-37.8497',
          locationLong: '144.968',
          raceDate: '2005-03-06',
          raceTime: '14:00:00Z',
          laps: '57',
          driver: driverFis,
          constructorDetails: constructor,
          winningTime: '1:24:17.336',
          fastestLap: '55',
          fastestLapTime: '1:25.994',
          fastestLapAverageSpeed: '222.001',
          fastestLapMeasurementUnit: 'kph'
        }),
        new Winner({
          round: 2,
          raceName: 'Malaysian Grand Prix',
          raceUrl: 'http://en.wikipedia.org/wiki/2005_Malaysian_Grand_Prix',
          circuitName: 'Sepang International Circuit',
          circuitUrl: 'http://en.wikipedia.org/wiki/Sepang_International_Circuit',
          locationLat: '2.76083',
          locationLong: '101.738',
          raceDate: '2005-03-20',
          raceTime: '15:00:00Z',
          laps: '56',
          driver: driverAlo,
          constructorDetails: constructor,
          winningTime: '1:24:17.336',
          fastestLap: '55',
          fastestLapTime: '1:25.994',
          fastestLapAverageSpeed: '222.001',
          fastestLapMeasurementUnit: 'kph'
        }),
      ];

      service.getWinners('2005')
        .subscribe(data => expect(data).toEqual(testData));
    });
  });
});
