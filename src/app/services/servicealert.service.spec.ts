import { TestBed } from '@angular/core/testing';

import { ServicealertService } from './servicealert.service';

describe('ServicealertService', () => {
  let service: ServicealertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicealertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
