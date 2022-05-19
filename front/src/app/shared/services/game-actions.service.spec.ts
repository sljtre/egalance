import { TestBed } from '@angular/core/testing';

import { GameActionsService } from './game-actions.service';

describe('GameActionsService', () => {
  let service: GameActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
