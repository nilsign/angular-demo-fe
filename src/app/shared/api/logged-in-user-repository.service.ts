import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from 'shared/api/dtos/dto-models';
import { getApiBaseUrl } from 'shared/helper/api-helper.service';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserRepositoryService {

  private loggedInUser: UserDto;

  constructor(private http: HttpClient) {
  }

  /**
   * This function is only executed when the application is initialized, to ensure that the user service has loaded the
   * logged in user data before the first page is rendered. Note, that the APP_INITIALIZER does not support Observable,
   * so Promise has to used as return type here. See app.module.ts.
   */
  loadLoggedInUser(): Promise<any> {
    console.log('this.loadLoggedInUser entered');

    return new Promise<any>((resolve: any): void => {
      this.requestLoggedInUser().subscribe((loggedInUser: UserDto) => {
        this.loggedInUser = loggedInUser;
      });
    });
  }

  getLoggedInUser(): UserDto {
    if (isNil(this.loggedInUser)) {
      this.loadLoggedInUser();
    }
    return this.loggedInUser;
  }

  private requestLoggedInUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${getApiBaseUrl()}/user/logged-in-user`);
  }
}
