import { TestBed } from '@angular/core/testing';

import { HeroServices } from './hero-services';

describe('HeroServices', () => {
  let service: HeroServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
