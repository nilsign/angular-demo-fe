import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from 'shared/api/dtos/dto-models';
import { getApiBaseUrl } from 'shared/functions/api-helper.functions';
import { SuperAdminAuthorizationGuard } from 'shared/guards/super-admin-authorization.guard';
import { AdminAuthorizationGuard } from 'shared/guards/admin-authorization.guard';

@Injectable({
  providedIn: 'root'
})
export class UserRestApiService {

  constructor(
      public http: HttpClient,
      public superAdminAuthGuard: SuperAdminAuthorizationGuard,
      public adminAuthGuard: AdminAuthorizationGuard) {
  }

  public getAllUsers(): Observable<UserDto[]> {
    if (this.superAdminAuthGuard.canActivate()) {
      return this.http.get<UserDto[]>(`${getApiBaseUrl()}/user`);
    }
    throw Error('Authorization failed. Illegal RestAPI request.');
  }

  public saveUser(userDto: UserDto): Observable<UserDto> {
    if (this.superAdminAuthGuard.canActivate()) {
      return this.http.post<UserDto>(`${getApiBaseUrl()}/user`, userDto);
    }
    throw Error('Authorization failed. Illegal RestAPI request.');
  }
}
