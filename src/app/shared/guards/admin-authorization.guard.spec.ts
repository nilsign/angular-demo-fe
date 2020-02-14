import { TestBed, async, inject } from '@angular/core/testing';

import { AdminAuthorizationGuard } from './admin-authorization.guard';

describe('AdminRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthorizationGuard]
    });
  });

  it('should ...', inject([AdminAuthorizationGuard], (guard: AdminAuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
