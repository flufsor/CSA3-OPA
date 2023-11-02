# Snippets

## Snippet: nakijken van token (node API)

```js
let verifyAccessToken = auth({
    audience: 'https://c7wnrl4p-3000.euw.devtunnels.ms',
    issuerBaseURL: 'https://flufap.eu.auth0.com/',
    tokenSigningAlg: 'RS256'
});
```

## Snippet: inloggen van gebruiker en aanvragen token (Angular)

```js
export class AuthService {

  userManager: UserManager;

  constructor() {
    const config = {                                // configuratie voor login request? Wij denken dat hier de audience in toegevoegd moet worden. Dit is ons echter niet gelukt.
      authority: environment.auth0_authority,
      client_id: environment.auth0_client_id,
      redirect_uri: environment.auth0_redirect_uri,
      response_type: 'code',
      scope: 'openid profile email read:messages',
      post_logout_redirect_uri: environment.auth0_post_logout_redirect_uri,
      metadata: {
        authorization_endpoint: `${environment.auth0_authority}/authorize`,
        token_endpoint: `${environment.auth0_authority}/oauth/token`,
        end_session_endpoint: `${environment.auth0_authority}/v2/logout?returnTo=${encodeURIComponent(environment.auth0_post_logout_redirect_uri)}&client_id=${environment.auth0_client_id}`
      }
    };
    this.userManager = new UserManager(config);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {               // aanloggen van gebruiker
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}

```

## Snippet: raadplegen van API (Angular)

```js
export class ApiService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  public callApi(): Promise<any> {
    return this.authService.getUser().then((user: User|null) => {
      if (user && user.access_token) {
        console.log("Token: ", user.access_token)
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

    return this.httpClient.get(environment.apiRoot + 'messages', { headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
/*         if (result.status === 401) {
          return this.authService.renewToken().then(user => {
            if(user != null){
              return this._callApi(user.access_token);
            }

          });
        } */
        throw result;
      });
  }
}
```
