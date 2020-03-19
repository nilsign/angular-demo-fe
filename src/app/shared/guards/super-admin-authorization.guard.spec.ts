import { TestBed, inject } from '@angular/core/testing';
import { SuperAdminAuthorizationGuard } from './super-admin-authorization.guard';
import { KeycloakService } from 'keycloak-angular';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakServiceStub } from 'testing/stubs';

describe('SuperAdminAuthorizationGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          SuperAdminAuthorizationGuard,
          LoggedInUserHelperService,
          HttpClient,
          HttpHandler,
          {
            provide: KeycloakService,
            useClass: KeycloakServiceStub
          }
      ]
    });
  });

  it('should be created', inject([SuperAdminAuthorizationGuard], async (guard: SuperAdminAuthorizationGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should authorize when logged in user has super admin role',
      inject([SuperAdminAuthorizationGuard], async (guard: SuperAdminAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isSuperAdmin').and.returnValue(true);

        const result = guard.canActivate();

        expect(result).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

  it('should not authorize when logged in user has not super admin role',
      inject([SuperAdminAuthorizationGuard], async (guard: SuperAdminAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isSuperAdmin').and.returnValue(false);

        const result = guard.canActivate();

        expect(result).toBeFalsy();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

  it('should redirect to login page when logged in user has not super admin role',
      inject([SuperAdminAuthorizationGuard], async (guard: SuperAdminAuthorizationGuard) => {
        spyOn(guard.loggedInUserService, 'isSuperAdmin').and.returnValue(false);
        const spy = spyOn(guard.keycloakService, 'login').and.stub().and.returnValue(Promise.resolve());

        guard.canActivate();

        expect(spy).toHaveBeenCalledTimes(1);
  }));
});
