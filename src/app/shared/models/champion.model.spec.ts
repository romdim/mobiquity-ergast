import { Constructor } from './constructor.model';
import { Champion } from './champion.model';
import { Driver } from './driver.model';

describe('Model: Champion', () => {
  const championValues = {
    season: 2005,
    rounds: 19,
    wins: 7,
    points: 133,
    driver: new Driver({
      code: 'ALO',
      dateOfBirth: '1981-07-29',
      driverId: 'alonso',
      givenName: 'Fernando',
      familyName: 'Alonso',
      nationality: 'Spanish',
      permanentNumber: '14',
      url: 'http://en.wikipedia.org/wiki/Fernando_Alonso'
    }),
    constructorDetails: new Constructor({
      constructorId: 'renault',
      name: 'Renault',
      nationality: 'French',
      url: 'http://en.wikipedia.org/wiki/Renault_F1'
    })
  };
  let champion: Champion;

  beforeEach(() => {
    champion = new Champion(championValues);
  });

  describe('constructor', () => {
    it('should create an instance of Champion', () => {
        expect(new Champion(championValues)).toBeTruthy();
    });
  });

  describe('jsonSerializer', () => {
    it('should deserialize Server response', () => {
      const json = {
        season: '2005',
        round: '19',
        DriverStandings: [
          {
            position: '1',
            positionText: '1',
            points: '133',
            wins: '7',
            Driver: {
              driverId: 'alonso',
              permanentNumber: '14',
              code: 'ALO',
              url: 'http://en.wikipedia.org/wiki/Fernando_Alonso',
              givenName: 'Fernando',
              familyName: 'Alonso',
              dateOfBirth: '1981-07-29',
              nationality: 'Spanish'
            },
            Constructors: [
              {
                constructorId: 'renault',
                url: 'http://en.wikipedia.org/wiki/Renault_F1',
                name: 'Renault',
                nationality: 'French'
              }
            ]
          }
        ]
      };
      expect(new Champion().jsonDeserializer(json)).toEqual(champion);
    });
  });
});
