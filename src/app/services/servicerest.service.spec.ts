import { TestBed } from '@angular/core/testing';

import { ServicerestService } from './servicerest.service';

describe('ServicerestService', () => {
  let service: ServicerestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicerestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
