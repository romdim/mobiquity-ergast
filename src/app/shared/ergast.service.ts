import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Champion } from './models/champion.model';
import { Winner } from './models/winner.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErgastService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description GET Champion by season from the server
   * @param season - The season for which we want to know the world champion
  */
  getChampion(season: string): Observable<Champion> {
    const url = `${this.apiUrl}/${season}/driverStandings/1.json`;
    return this.http.get<Champion>(url)
      .pipe(
        map((data: any) => new Champion().jsonDeserializer(data.MRData.StandingsTable.StandingsLists[0])),
        catchError(this.handleError<Champion>(`getChampion season=${season}`))
      );
  }

  /**
   * @description GET all champions from the server
  */
  getChampions(): Observable<Champion[]> {
    const offset = 55;
    const limit = 11;
    // Map response to object
    const url = `${this.apiUrl}/driverStandings/1.json?offset=${offset}&limit=${limit}`;
    return this.http.get<Champion[]>(url)
      .pipe(
        map((data: any) => data.MRData.StandingsTable.StandingsLists),
        map((data: any) => data.map(datum => new Champion().jsonDeserializer(datum))),
        catchError(this.handleError<Champion[]>('getChampions', []))
      );
  }

  /**
   * @description GET all winners for a season from the server
   * @param season - The season for which we want to know the round winners
  */
  getWinners(season: string): Observable<Winner[]> {
    const url = `${this.apiUrl}/${season}/results/1.json`;
    return this.http.get<Winner[]>(url)
      .pipe(
        map((data: any) => data.MRData.RaceTable.Races),
        map((data: any) => data.map(datum => new Winner().jsonDeserializer(datum))),
        catchError(this.handleError<Winner[]>('getWinner', []))
      );
  }

  /**
   * @description Handle Http operation that failed. Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
