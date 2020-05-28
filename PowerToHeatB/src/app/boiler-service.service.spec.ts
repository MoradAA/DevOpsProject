import { TestBed } from '@angular/core/testing';

import { BoilerServiceService } from './boiler-service.service';

describe('BoilerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoilerServiceService = TestBed.get(BoilerServiceService);
    expect(service).toBeTruthy();
  });
});
