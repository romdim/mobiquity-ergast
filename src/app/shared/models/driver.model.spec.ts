import { Driver } from './driver.model';

describe('Model: Driver', () => {
  const driverValues = {
    code: 'ALO',
    dateOfBirth: '1981-07-29',
    driverId: 'alonso',
    givenName: 'Fernando',
    familyName: 'Alonso',
    nationality: 'Spanish',
    permanentNumber: '14',
    url: 'http://en.wikipedia.org/wiki/Fernando_Alonso'
  };
  let driver: Driver;

  beforeEach(() => {
    driver = new Driver(driverValues);
  });

  describe('constructor', () => {
    it('should create an instance of Driver', () => {
        expect(new Driver(driverValues)).toBeTruthy();
    });
  });

  describe('ageThen', () => {
    it('should return 30', () => {
      expect(driver.ageThen(2011)).toEqual(30);
    });
  });

  describe('ageNow', () => {
    it('should return 37', () => {
      const now = new Date(2018, 5, 21);
      jasmine.clock().mockDate(now);
      expect(driver.ageNow()).toEqual(37);
    });
  });
});
