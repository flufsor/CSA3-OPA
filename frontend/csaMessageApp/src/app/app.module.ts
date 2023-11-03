import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninCallbackComponent } from './signin-callback.component';
import { HttpClientModule } from '@angular/common/http';
import { BarTabComponent } from './bar-tab/bar-tab.component';

const routes: Routes = [
  { path: 'bartab', component: BarTabComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login/callback', component: SigninCallbackComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BarTabComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
