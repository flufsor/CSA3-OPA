import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client-ts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userManager: UserManager;

  constructor() {
    const config = {
      authority: environment.auth0_authority,
      client_id: environment.auth0_client_id,
      redirect_uri: environment.auth0_redirect_uri,
      response_type: 'code',
      scope: 'openid profile email',
      post_logout_redirect_uri: environment.auth0_post_logout_redirect_uri,
      metadata: {
        authorization_endpoint: `${environment.auth0_authority}/authorize`,
        token_endpoint: `${environment.auth0_authority}/oauth/token`,
        end_session_endpoint: `${environment.auth0_authority}/v2/logout?returnTo=${encodeURIComponent(environment.auth0_post_logout_redirect_uri)}&client_id=${environment.auth0_client_id}`
      },
      extraQueryParams: {
        // request audience for access token
        "audience": environment.auth0_api_audience,
      },
    };
    this.userManager = new UserManager(config);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
