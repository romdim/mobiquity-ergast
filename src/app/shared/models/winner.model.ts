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
    return countries.getAlpha2Code(this.sanitizedCountryName(), 'en');
  }

  /**
   * @description Get proper names for matching the i18n iso countries library
   */
  sanitizedCountryName(): string {
    if (this.locationCountry === 'USA') {
      return 'United States Of America';
    } else if (this.locationCountry === 'UK') {
      return 'United Kingdom';
    } else if (this.locationCountry === 'UAE') {
      return 'United Arab Emirates';
    } else if (this.locationCountry === 'Korea') {
      return 'South Korea';
    } else {
      return this.locationCountry;
    }
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
    const fastestLapObject = json.Results[0].FastestLap;
    this.fastestLap = this.deserializerTryValue(fastestLapObject, fastestLapObject.lap);
    this.fastestLapTime = this.deserializerTryValue(fastestLapObject, fastestLapObject.Time.time);
    this.fastestLapAverageSpeed = this.deserializerTryValue(fastestLapObject, fastestLapObject.AverageSpeed.speed);
    this.fastestLapMeasurementUnit = this.deserializerTryValue(fastestLapObject, fastestLapObject.AverageSpeed.units);

    return this;
  }

  /**
   * @description This method is like try - catch for checking if a certain key from an Object
   * @param objectKeyToTry - This is the object we want to check if exists
   * @param objectKeyToGet - This is the key for which we need the value
   * @param catchValue - If the key does not exist, this is our fallback
   */
  deserializerTryValue(objectKeyToTry: any, objectKeyToGet: any, catchValue = 'Not recorded'): string {
    return objectKeyToTry ? objectKeyToGet : catchValue;
  }
}
