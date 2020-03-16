import { TestBed, async, inject } from '@angular/core/testing';
import { SuperAdminAuthorizationGuard } from './super-admin-authorization.guard';

describe('SuperAdminAuthorizationGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminAuthorizationGuard]
    });
  });

  it('should ...', inject([SuperAdminAuthorizationGuard], (guard: SuperAdminAuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
