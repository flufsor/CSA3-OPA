import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  userManager: UserManager; // Voeg userManager toe als een eigenschap van de klasse

  constructor(private router: Router) {
    const config = {
      authority: 'https://flufap.eu.auth0.com',
      client_id: 'iysO4wHMr5oQF7V3F7gQX4Y8rJSHyCol',
      redirect_uri: 'http://localhost:4200/callback', // Stel dit in op de juiste callback-URL van je app
      response_type: 'code',
      scope: 'openid profile email', // Pas de scope aan op basis van je behoeften
      post_logout_redirect_uri: 'http://localhost:4200', // Stel dit in op de juiste URL voor uitloggen
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    };
    
    this.userManager = new UserManager(config);
  }

  login() {
    this.userManager.signinRedirect(); // Start de inlogstroom met Auth0
  }
}