import { TestBed, inject } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SellerAuthorizationGuard } from './seller-authorization.guard';
import { KeycloakServiceStub } from 'testing/stubs';

describe('SellerAuthorizationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          SellerAuthorizationGuard,
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

  it('should be created',
      inject([SellerAuthorizationGuard], async (guard: SellerAuthorizationGuard) => {
        expect(guard).toBeTruthy();
      }));

  it('should authorize when logged in user has seller role',
      inject([SellerAuthorizationGuard], async (guard: SellerAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isSeller').and.returnValue(true);

        const result = guard.canActivate();

        expect(result).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

  it('should not authorize when logged in user has not weller role',
      inject([SellerAuthorizationGuard], async (guard: SellerAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isSeller').and.returnValue(false);

        const result = guard.canActivate();

        expect(result).toBeFalsy();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

  it('should redirect to login page when logged in user has not seller role',
      inject([SellerAuthorizationGuard], async (guard: SellerAuthorizationGuard) => {
        spyOn(guard.loggedInUserService, 'isSeller').and.returnValue(false);
        const spy = spyOn(guard.keycloakService, 'login').and.stub().and.returnValue(Promise.resolve());

        guard.canActivate();

        expect(spy).toHaveBeenCalledTimes(1);
      }));
});
