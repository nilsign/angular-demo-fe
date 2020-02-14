import { TestBed, async, inject } from '@angular/core/testing';

import { BuyerAuthorizationGuard } from './buyer-authorization.guard';

describe('BuyerRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyerAuthorizationGuard]
    });
  });

  it('should ...', inject([BuyerAuthorizationGuard], (guard: BuyerAuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
