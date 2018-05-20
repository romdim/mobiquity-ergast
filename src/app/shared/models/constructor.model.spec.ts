import { Constructor } from './constructor.model';

describe('Model: Constructor', () => {
  const constructorValues = {
    constructorId: 'renault',
    name: 'Renault',
    nationality: 'French',
    url: 'http://en.wikipedia.org/wiki/Renault_F1'
  };

  describe('constructor', () => {
    it('should create an instance of Constructor', () => {
        expect(new Constructor(constructorValues)).toBeTruthy();
    });
  });
});
