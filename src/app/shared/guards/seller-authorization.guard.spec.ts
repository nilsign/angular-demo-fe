import { TestBed, async, inject } from '@angular/core/testing';

import { SellerAuthorizationGuard } from './seller-authorization.guard';

describe('SellerRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerAuthorizationGuard]
    });
  });

  it('should ...', inject([SellerAuthorizationGuard], (guard: SellerAuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
