import { TestBed, inject } from '@angular/core/testing';

import { ErgastService } from './ergast.service';

describe('ErgastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErgastService]
    });
  });

  it('should be created', inject([ErgastService], (service: ErgastService) => {
    expect(service).toBeTruthy();
  }));
});
