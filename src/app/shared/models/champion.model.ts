import { Driver } from './driver.model';
import { Constructor } from './constructor.model';

export class Champion {
  season: number;
  rounds: number;

  wins: number;
  points: number;
  driver: Driver;

  constructorDetails: Constructor;

  constructor(values: Object = {}) {
    Object.assign(this, values);
    return this;
  }

  /**
   * @description This method deserializes the server response to Champion class
   * @param json - The JSON object after parsing the server's response
   */
  jsonDeserializer(json: any): Champion {
    this.season = +json.season;
    this.rounds = +json.round;

    this.wins = +json.DriverStandings[0].wins;
    this.points = +json.DriverStandings[0].points;
    this.driver = new Driver(json.DriverStandings[0].Driver);

    this.constructorDetails = new Constructor(json.DriverStandings[0].Constructors[0]);

    return this;
  }
}
