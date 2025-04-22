import { TestBed } from '@angular/core/testing';

import { FelhasznalokLoginService } from './felhasznalok-login.service';

describe('FelhasznalokLoginService', () => {
  let service: FelhasznalokLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FelhasznalokLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
