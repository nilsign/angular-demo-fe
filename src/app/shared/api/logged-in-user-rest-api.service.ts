import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from 'shared/api/dtos/dto-models';
import { getApiBaseUrl } from 'shared/helper/api-helper.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserRestApi {

  constructor(public http: HttpClient) {
  }

  public requestLoggedInUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${getApiBaseUrl()}/user/logged-in-user`);
  }
}
