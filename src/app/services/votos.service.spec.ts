import { TestBed } from '@angular/core/testing';

import { VotosService } from './votos.service';

describe('VotosService', () => {
  let service: VotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
