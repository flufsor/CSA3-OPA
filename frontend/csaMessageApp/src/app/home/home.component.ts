import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { ApiService } from '../api.service';
import { User } from 'oidc-client-ts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, public apiService: ApiService) { }

  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }

  currentUser: User | null = null

  ngOnInit(): void {
    this.authService.getUser().then(user => {
      this.currentUser = user;
    })
  }

  public onLogin() {
    this.authService.login();
  }

  public onCallAPI() {
    this.apiService.getApiRoute("protected")
  }

  public onRenewToken() {
    this.authService.renewToken()
      .then(user => {
        this.currentUser = user;
      });
  }

  public onLogout() {
    this.authService.logout();
  }

  public refresh(): void {
    this.authService.getUser().then(user => {
      this.currentUser = user;
    });
  }
}
