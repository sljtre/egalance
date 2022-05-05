import { TestBed } from '@angular/core/testing';

import { TuilesService } from './tuiles.service';

describe('TuilesService', () => {
  let service: TuilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
