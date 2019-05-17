import { TestBed, inject } from '@angular/core/testing';

import { StorageFeeService } from './storage-fee.service';

describe('StorageFeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageFeeService]
    });
  });

  it('should be created', inject([StorageFeeService], (service: StorageFeeService) => {
    expect(service).toBeTruthy();
  }));
});
