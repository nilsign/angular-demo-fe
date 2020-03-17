import { TestBed, inject } from '@angular/core/testing';
import { AdminAuthorizationGuard } from './admin-authorization.guard';
import { KeycloakService } from 'keycloak-angular';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AdminAuthorizationGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          AdminAuthorizationGuard,
          LoggedInUserHelperService,
          HttpClient,
          HttpHandler,
          KeycloakService
      ]
    });
  });

  it('should be created',
      inject([AdminAuthorizationGuard], (guard: AdminAuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should authorize when logged in user has admin role',
      inject([AdminAuthorizationGuard], (guard: AdminAuthorizationGuard) => {
    const spy = spyOn(guard.loggedInUserService, 'isAdmin').and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should not authorize when logged in user has not admin role',
      inject([AdminAuthorizationGuard], (guard: AdminAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isAdmin').and.returnValue(false);

        const result = guard.canActivate();

        expect(result).toBeFalsy();
        expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should redirect to login page when logged in user has not admin role',
      inject([AdminAuthorizationGuard], (guard: AdminAuthorizationGuard) => {
        spyOn(guard.loggedInUserService, 'isAdmin').and.returnValue(false);
        const spy = spyOn(guard.keycloakService, 'login').and.callFake(() => Promise.resolve());

        guard.canActivate();

        expect(spy).toHaveBeenCalledTimes(1);
   }));
});
