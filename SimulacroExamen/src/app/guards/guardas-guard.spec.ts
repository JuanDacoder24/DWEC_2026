import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardasGuard } from './guardas-guard';

describe('guardasGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardasGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
