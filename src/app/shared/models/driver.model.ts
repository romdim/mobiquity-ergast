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
   * @description This method returns first and last name concatenated
   */
  getFullName(): string {
    return this.givenName + ' ' + this.familyName;
  }
}
