import { TestBed } from '@angular/core/testing';

import { SecretsharingService } from './secretsharing.service';

describe('SecretsharingService', () => {
  let service: SecretsharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretsharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
