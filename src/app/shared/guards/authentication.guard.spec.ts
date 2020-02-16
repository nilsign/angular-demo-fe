import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationGuard } from './authentication.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

describe('AuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
      ],
      providers: [
        RouterTestingModule,
        {
          provide: KeycloakAuthGuard,
          useValue: class {
            authenticated = false;
          }
        },
        {
          provide: KeycloakService,
          useValue: new KeycloakService()
        }
      ]
    });
  });

  it('should be created',
      inject([AuthenticationGuard], (guard: AuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));

  it ('should resolve with true if user is authenticated',
      inject([AuthenticationGuard], async (guard: AuthenticationGuard) => {
    const spy1 = spyOn(guard, 'isAuthenticated').and.returnValue(true);
    const spy2 = spyOn(guard.keycloakService, 'login');

    const promise = await guard.isAccessAllowed(null, null);

    expect(promise.valueOf()).toBeTruthy();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalled();
  }));

  it ('should resolve with false if user is not authenticated',
      inject([AuthenticationGuard], async (guard: AuthenticationGuard) => {
    const spy1 = spyOn(guard, 'isAuthenticated').and.returnValue(false);
    const spy2 = spyOn(guard.keycloakService, 'login').and.callFake(
        () => Promise.resolve());

    const promise = await guard.isAccessAllowed(null, null);

    expect (promise.valueOf()).toBeFalsy();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  }));

  it ('should return authenticated state from super class',
      inject([AuthenticationGuard], async (guard: AuthenticationGuard) => {
    const result = guard.isAuthenticated();

    expect(result).toBeFalsy();
  }));
});
