import { TestBed } from '@angular/core/testing';

import { PaillierService } from './paillier.service';

describe('PaillierService', () => {
  let service: PaillierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaillierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
