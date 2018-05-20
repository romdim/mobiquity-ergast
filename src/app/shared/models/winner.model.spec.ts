import { Constructor } from './constructor.model';
import { Driver } from './driver.model';
import { Winner } from './winner.model';

describe('Model: Winner', () => {
  const winnerValues = {
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
    driver: new Driver({
      code: 'FIS',
      dateOfBirth: '1973-01-14',
      driverId: 'fisichella',
      givenName: 'Giancarlo',
      familyName: 'Fisichella',
      nationality: 'Italian',
      url: 'http://en.wikipedia.org/wiki/Giancarlo_Fisichella'
    }),
    constructorDetails: new Constructor({
      constructorId: 'renault',
      name: 'Renault',
      url: 'http://en.wikipedia.org/wiki/Renault_F1',
      nationality: 'French'
    }),
    winningTime: '1:24:17.336',
    fastestLap: '55',
    fastestLapTime: '1:25.994',
    fastestLapAverageSpeed: '222.001',
    fastestLapMeasurementUnit: 'kph'
  };
  let winner: Winner;

  beforeEach(() => {
    winner = new Winner(winnerValues);
  });

  describe('constructor', () => {
    it('should create an instance of Winner', () => {
        expect(new Winner(winnerValues)).toBeTruthy();
    });
  });

  describe('jsonSerializer', () => {
    it('should deserialize Server response', () => {
      const json = {
        season: '2005',
        round: '1',
        url: 'http://en.wikipedia.org/wiki/2005_Australian_Grand_Prix',
        raceName: 'Australian Grand Prix',
        Circuit: {
          circuitId: 'albert_park',
          url: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
          circuitName: 'Albert Park Grand Prix Circuit',
          Location: {
            lat: '-37.8497',
            long: '144.968',
            locality: 'Melbourne',
            country: 'Australia'
          }
        },
        date: '2005-03-06',
        time: '14:00:00Z',
        Results: [
          {
            number: '6',
            position: '1',
            positionText: '1',
            points: '10',
            Driver: {
              driverId: 'fisichella',
              code: 'FIS',
              url: 'http://en.wikipedia.org/wiki/Giancarlo_Fisichella',
              givenName: 'Giancarlo',
              familyName: 'Fisichella',
              dateOfBirth: '1973-01-14',
              nationality: 'Italian'
            },
            Constructor: {
              constructorId: 'renault',
              url: 'http://en.wikipedia.org/wiki/Renault_F1',
              name: 'Renault',
              nationality: 'French'
            },
            grid: '1',
            laps: '57',
            status: 'Finished',
            Time: {
              millis: '5057336',
              time: '1:24:17.336'
            },
            FastestLap: {
              rank: '2',
              lap: '55',
              Time: {
                time: '1:25.994'
              },
              AverageSpeed: {
                units: 'kph',
                speed: '222.001'
              }
            }
          }
        ]
      };
      expect(new Winner().jsonDeserializer(json)).toEqual(winner);
    });
  });
});
