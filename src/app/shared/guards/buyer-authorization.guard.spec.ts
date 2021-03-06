import { TestBed, inject } from '@angular/core/testing';
import { KeycloakService } from 'keycloak-angular';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BuyerAuthorizationGuard } from './buyer-authorization.guard';
import { KeycloakServiceStub } from 'testing/stubs';


describe('BuyerAuthorizationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          BuyerAuthorizationGuard,
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
      inject([BuyerAuthorizationGuard], async (guard: BuyerAuthorizationGuard) => {
        expect(guard).toBeTruthy();
      }));

  it('should authorize when logged in user has buyer role',
      inject([BuyerAuthorizationGuard], async (guard: BuyerAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isBuyer').and.returnValue(true);

        const result = guard.canActivate();

        expect(result).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

  it('should not authorize when logged in user has not buyer role',
      inject([BuyerAuthorizationGuard], async (guard: BuyerAuthorizationGuard) => {
        const spy = spyOn(guard.loggedInUserService, 'isBuyer').and.returnValue(false);

        const result = guard.canActivate();

        expect(result).toBeFalsy();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

  it('should redirect to login page when logged in user has not buyer role',
      inject([BuyerAuthorizationGuard], async (guard: BuyerAuthorizationGuard) => {
        spyOn(guard.loggedInUserService, 'isBuyer').and.returnValue(false);
        const spy = spyOn(guard.keycloakService, 'login').and.stub().and.returnValue(Promise.resolve());

        guard.canActivate();

        expect(spy).toHaveBeenCalledTimes(1);
      }));
});
