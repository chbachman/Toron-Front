import { TestBed } from '@angular/core/testing';

import { ToronBackendService } from './toron-backend.service';

describe('ToronBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToronBackendService = TestBed.get(ToronBackendService);
    expect(service).toBeTruthy();
  });
});
