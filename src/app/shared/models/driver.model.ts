// import * as countries from 'i18n-iso-countries';
// declare var require: any;

export class Driver {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    return this;
  }

  /**
   * @description This method calculates how old the driver was when he/she won
   * @param season - The year the driver won
   */
  ageThen(season: number): number {
    const yearOfBirth: number = new Date(this.dateOfBirth).getFullYear();
    return season - yearOfBirth;
  }

  /**
   * @description This method calculates how old the driver is now
   */
  ageNow(): number {
    const yearNow: number = new Date().getFullYear();
    const yearOfBirth: number = new Date(this.dateOfBirth).getFullYear();
    return yearNow - yearOfBirth;
  }

  /**
   * @description This method return the Alpha2Code of a country by nationality
   * Currently not implemented unfortunately, will pr it soon though
   * at https://github.com/michaelwittig/node-i18n-iso-countries
   * to use along with https://github.com/lipis/flag-icon-css
   * for showing flags instead of nationality of drivers
   */
  // getCountryIso(): string {
    // countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    // return countries.getAlpha2CodeFromNat(this.nationality, 'en');
  // }

  /**
   * @description This method returns first and last name concatenated
   */
  getFullName(): string {
    return this.givenName + ' ' + this.familyName;
  }
}
