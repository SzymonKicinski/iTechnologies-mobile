import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, API_URL } from './api-connect';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

const TOKEN_KEY = 'auth-token';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

export class Response {
  access_token: string;
  expires_in: number;
  jti: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token = '';

  loading: LoadingController;

  currentUser: User;

  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private plt: Platform,
    private alertService: AlertService,
    private alertCtrl: AlertController,
    private httpClient: HttpClient
  ) {
    this.plt.ready().then(() => {
      console.log('this.storage constructor AuthService CheckToken');
      console.log(this.storage);
      this.checkToken();
    });
  }

  auth(username: string, password: string): Promise<any> {
    if (username === '' || password === '' || username === null || password === null) {
      this.alertService.showError('Empty credentials');
    } else {
      return new Promise((resolve, reject) => {
        const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
        this.httpClient.post(`${API_URL}/login`, body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
          }
        })
          .subscribe((response: Response) => {
              localStorage.setItem('token', `Bearer ${response.access_token}`);
              this.storage.set('token', `Bearer ${response.access_token}`);
              resolve(response.access_token);
              return response;
          }, error => {
            console.log(error);
            this.alertService.showError('Bad credentials');
          });
      });
    }

  }

  setAuthenticationState(value: boolean) {
    return this.authenticationState.next(value);
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        console.log('this.storage checkToken');
        console.log(this.storage);
        this.authenticationState.next(true);
      }
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      console.log('this.storage logout()');
      console.log(this.storage);
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    console.log('this.storage isAuth()');
    console.log(this.storage);
    return this.authenticationState.value;
  }

  register(credentials) {
    return null;
  }


}
