import { TestBed } from '@angular/core/testing';

import { PgDataService } from './pg-data.service';

describe('PgDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PgDataService = TestBed.get(PgDataService);
    expect(service).toBeTruthy();
  });
});
