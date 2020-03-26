import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from 'shared/api/dtos/dto-models';
import { getApiBaseUrl } from 'shared/functions/api-helper.functions';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserRestApiService {

  constructor(public http: HttpClient) {
  }

  getLoggedInUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${getApiBaseUrl()}/user/logged-in-user`);
  }
}
