import { environment } from 'environments/environment';

export function getApiBaseUrl(): string {
  return `${environment.apiBaseUrl}/api/${environment.apiVersion}`;
}
