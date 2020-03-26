import { environment } from 'environments/environment';
import { HttpParams } from '@angular/common/http';

export function getApiBaseUrl(): string {
  return `${environment.apiBaseUrl}/api/${environment.apiVersion}`;
}

export function buildHttpPathParams(params: { [key: string]: string }): HttpParams {
  const httpParams = new HttpParams();
  Object.keys(params).forEach((key: string) => {
    httpParams.append(key, params[key]);
  });
  return httpParams;
}
