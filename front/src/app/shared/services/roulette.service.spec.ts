import { TestBed } from '@angular/core/testing';

import { RouletteService } from './roulette.service';

describe('RouletteService', () => {
  let service: RouletteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouletteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
