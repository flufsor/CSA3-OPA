import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'oidc-client-ts';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root' 
})
export class ApiService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  public getApiRoute(route: string): Promise<any> {
    return this.getAccessToken().then((accessToken: string) => {
      const headers = new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      });

      return this.httpClient.get(environment.apiRoot + route, { headers })
        .toPromise()
        .catch((result: HttpErrorResponse) => {
          if (result.status === 401) {
            return this.authService.renewToken()
              .then(user => {
                if (user != null) {
                  return this.getApiRoute(route);
                } else {
                  throw new Error('user is not logged in');
                }
              });
          }
          throw result;
        });
    });
  }

  private getAccessToken(): Promise<string> {
    return this.authService.getUser().then((user: User | null) => {
      if (user?.access_token) {
        return user.access_token;
      } else if (user) {
        return this.authService.renewToken().then((renewedUser: User | null) => {
          if (renewedUser) {
            return renewedUser.access_token;
          } else {
            throw new Error('user is not logged in');
          }
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }
}