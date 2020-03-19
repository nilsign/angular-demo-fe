import { TestBed, async, inject } from '@angular/core/testing';
import { SuperAdminAuthorizationGuard } from './super-admin-authorization.guard';
import {KeycloakService} from 'keycloak-angular';
import {LoggedInUserHelperService} from 'shared/helper/logged-in-user-helper.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('SuperAdminAuthorizationGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          SuperAdminAuthorizationGuard,
          LoggedInUserHelperService,
          HttpClient,
          HttpHandler,
          KeycloakService
      ]
    });
  });

  it('should be created', inject([SuperAdminAuthorizationGuard], (guard: SuperAdminAuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should authorize when logged in user has super admin role',
      inject([SuperAdminAuthorizationGuard], (guard: SuperAdminAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isSuperAdmin').and.returnValue(true);

        const result = guard.canActivate();

        expect(result).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

  it('should not authorize when logged in user has not super admin role',
      inject([SuperAdminAuthorizationGuard], (guard: SuperAdminAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isSuperAdmin').and.returnValue(false);

        const result = guard.canActivate();

        expect(result).toBeFalsy();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

  it('should redirect to login page when logged in user has not super admin role',
      inject([SuperAdminAuthorizationGuard], (guard: SuperAdminAuthorizationGuard) => {
        spyOn(guard.loggedInUserService, 'isSuperAdmin').and.returnValue(false);
        const spy = spyOn(guard.keycloakService, 'login').and.stub().and.returnValue(Promise.resolve());

        guard.canActivate();

        expect(spy).toHaveBeenCalledTimes(1);
  }));
});
