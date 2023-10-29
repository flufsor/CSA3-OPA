import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { User } from 'oidc-client-ts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})

export class HomeComponent implements OnInit {
  constructor(public _authService: AuthService, private _router: Router) {

  }

  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }

  currentUser: User | null = null

  ngOnInit(): void {
    this._authService.getUser().then(user => {
      this.currentUser = user;
    })
  }

  public onLogin() {
    this._authService.login();
  }

  // public onCallAPI() {
  //   this.clearMessages();
  //   this.apiService.callApi().then(result => {
  //     this.addMessage('API Result: ' + JSON.stringify(result));
  //   }, err => this.addError(err));
  // }

  public onRenewToken() {
    this._authService.renewToken()
      .then(user => {
        this.currentUser = user;
      });
  }

  public onLogout() {
    this._authService.logout();
  }

  public refresh(): void {
    this._authService.getUser().then(user => {
      this.currentUser = user;
    });
  }
}
