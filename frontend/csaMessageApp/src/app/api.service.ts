import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'oidc-client-ts';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  public callApi(): Promise<any> {
    return this.authService.getUser().then((user: User|null) => {
      if (user && user.access_token) {
        return this._callApi(user.access_token);
      } else if (user) {
        return this.authService.renewToken().then((user: User|null) => {
          if(user != null){
            return this._callApi(user.access_token);
          }
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  _callApi(token: string):any {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.httpClient.get(environment.apiRoot + 'protected', { headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
         if (result.status === 401) {
          return this.authService.renewToken().then(user => {
            if(user != null){
              return this._callApi(user.access_token);
            }

          });
        }
        throw result;
      });
  }
}
