import { TestBed } from '@angular/core/testing';

import { FelhasznalokService } from './felhasznalok.service';

describe('FelhasznalokService', () => {
  let service: FelhasznalokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FelhasznalokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
