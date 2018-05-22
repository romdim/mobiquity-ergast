import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Champion } from './models/champion.model';
import { Winner } from './models/winner.model';
import { Driver } from './models/driver.model';
import { Constructor } from './models/constructor.model';

@Injectable()

export class ErgastMockService {
  constructor() { }

  private getAlonsoDriver(): Driver {
    return new Driver({
      code: 'ALO',
      dateOfBirth: '1981-07-29',
      driverId: 'alonso',
      givenName: 'Fernando',
      familyName: 'Alonso',
      nationality: 'Spanish',
      permanentNumber: '14',
      url: 'http://en.wikipedia.org/wiki/Fernando_Alonso'
    });
  }

  private getFisichellaDriver(): Driver {
    return new Driver({
      code: 'FIS',
      dateOfBirth: '1973-01-14',
      driverId: 'fisichella',
      givenName: 'Giancarlo',
      familyName: 'Fisichella',
      nationality: 'Italian',
      url: 'http://en.wikipedia.org/wiki/Giancarlo_Fisichella'
    });
  }

  private getRenaultConstructor(): Constructor {
    return new Constructor({
      constructorId: 'renault',
      name: 'Renault',
      nationality: 'French',
      url: 'http://en.wikipedia.org/wiki/Renault_F1'
    });
  }

  /** GET Champion from the server */
  getChampion(season: string): Observable<Champion> {
    return of(
      new Champion({
        season: 2005,
        rounds: 19,
        wins: 7,
        points: 133,
        driver: this.getAlonsoDriver(),
        constructorDetails: this.getRenaultConstructor()
      })
    );
  }

  /** GET Champions from the server */
  getChampions(): Observable<Champion[]> {
    return of([
      new Champion({
        season: 2005,
        rounds: 19,
        wins: 7,
        points: 133,
        driver: this.getAlonsoDriver(),
        constructorDetails: this.getRenaultConstructor()
      }),
      new Champion({
        season: 2006,
        rounds: 18,
        wins: 7,
        points: 134,
        driver: this.getAlonsoDriver(),
        constructorDetails: this.getRenaultConstructor()
      })
    ]);
  }

  /** GET Winners from the server */
  getWinners(season: string): Observable<Winner[]> {
    return of([
      new Winner({
        round: 1,
        raceName: 'Australian Grand Prix',
        raceUrl: 'http://en.wikipedia.org/wiki/2005_Australian_Grand_Prix',
        circuitName: 'Albert Park Grand Prix Circuit',
        circuitUrl: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
        locationLat: '-37.8497',
        locationLong: '144.968',
        locationLocality: 'Melbourne',
        locationCountry: 'Australia',
        raceDate: '2005-03-06',
        raceTime: '14:00:00Z',
        laps: '57',
        driver: this.getFisichellaDriver(),
        constructorDetails: this.getRenaultConstructor(),
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
        locationLocality: 'Kuala Lumpur',
        locationCountry: 'Malaysia',
        raceDate: '2005-03-20',
        raceTime: '15:00:00Z',
        laps: '56',
        driver: this.getAlonsoDriver(),
        constructorDetails: this.getRenaultConstructor(),
        winningTime: '1:24:17.336',
        fastestLap: '55',
        fastestLapTime: '1:25.994',
        fastestLapAverageSpeed: '222.001',
        fastestLapMeasurementUnit: 'kph'
      })
    ]);
  }
}
