import * as countries from 'i18n-iso-countries';
declare var require: any;

import { Driver } from './driver.model';
import { Constructor } from './constructor.model';

export class Winner {
  round: number;
  raceName: string;
  raceUrl: string;
  circuitName: string;
  circuitUrl: string;
  locationLat: number;
  locationLong: number;
  locationLocality: string;
  locationCountry: string;
  raceDate: string;
  raceTime: string;
  laps: string;

  driver: Driver;

  constructorDetails: Constructor;

  winningTime: string;
  fastestLap: string;
  fastestLapTime: string;
  fastestLapAverageSpeed: string;
  fastestLapMeasurementUnit: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    return this;
  }

  getRaceDateTime(): string {
    return this.raceDate + ' ' + this.raceTime;
  }

  /**
   * @description This method returns the Alpha2Code of a country
   */
  getCountryIso(): string {
    countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.locationCountry = this.locationCountry === 'USA' ? 'United States Of America' : this.locationCountry;
    return countries.getAlpha2Code(this.locationCountry, 'en');
  }

  /**
   * @description This method deserializes the server response to Winner class
   * @param json - The JSON object after parsing the server's response
   */
  jsonDeserializer(json: any): Winner {
    this.round = +json.round;
    this.raceName = json.raceName;
    this.raceUrl = json.url;
    this.circuitName = json.Circuit.circuitName;
    this.circuitUrl = json.Circuit.url;
    this.locationLat = +json.Circuit.Location.lat;
    this.locationLong = +json.Circuit.Location.long;
    this.locationLocality = json.Circuit.Location.locality;
    this.locationCountry = json.Circuit.Location.country;
    this.raceDate = json.date;
    this.raceTime = json.time;
    this.laps = json.Results[0].laps;

    this.driver = new Driver(json.Results[0].Driver);

    this.constructorDetails = new Constructor(json.Results[0].Constructor);

    this.winningTime = json.Results[0].Time.time;
    this.fastestLap = json.Results[0].FastestLap.lap;
    this.fastestLapTime = json.Results[0].FastestLap.Time.time;
    this.fastestLapAverageSpeed = json.Results[0].FastestLap.AverageSpeed.speed;
    this.fastestLapMeasurementUnit = json.Results[0].FastestLap.AverageSpeed.units;

    return this;
  }
}