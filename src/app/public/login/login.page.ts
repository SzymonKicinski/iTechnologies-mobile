import { ItemsService } from './../../services/items.service';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from './../../services/session.service';
import { async } from '@angular/core/testing';
import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { UserApiService } from '../../services/user-api.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: LoadingController;
  registerCredentials = { username: '', password: '' };


  messageList = {
    LOGIN_SUCCESS: 'Logged',
    TRY_AGAIN: 'An error occured running of server',
    DISABLED: 'Disabled account',
    BAD_CREDENTIALS: 'Incorrect data',
  };

  constructor(
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private nav: NavController,
    private alertCtrl: AlertController,
    private alertService: AlertService,
    private userApiService: UserApiService,
    private sessionService: SessionService,
    private storage: Storage,
    private itemsService: ItemsService
  ) { }

  ngOnInit() {
  }

  public createAccount() {
    this.nav.navigateForward('register');
  }

  login() {
    let run = true;

    if (
      this.registerCredentials.password === '' ||
      this.registerCredentials.username === ''
    ) {
      run = false;
    }
    if (
      this.registerCredentials.username === null ||
      this.registerCredentials.password === null
    ) {
      run = false;
    }
    if (this.registerCredentials.username === undefined ||
      this.registerCredentials.password === undefined
    ) {
      run = false;
    }
    if (run) {
      this.authService.auth(this.registerCredentials.username, this.registerCredentials.password)
        .then(data => {
          this.authService.token = localStorage.getItem('token');
          console.log('TOKEN!!!!!!!!!!!!!!!');
          console.log(localStorage.getItem('token'));
          this.findUserByUsername();
          console.log('localStorage auth()');
          console.log(localStorage);
          console.log('this.storage auth()');
          console.log(this.storage);
        }, (error) => {
          console.log(error);
        }
        ).catch((error => {
          console.log(error);
        }
        ));
    } else {
      this.alertService.showError('Empty credentials');
    }

  }

  findUserByUsername() {
    this.userApiService.findUserByUsername(this.registerCredentials.username)
      .then((response: any) => {
        this.sessionService.currentUser = response.data;
        // console.log(this.sessionService.currentUser);
        const isAdmin = this.sessionService.currentUser.roleAdmin;
        this.setAuthorities(isAdmin);
        if (this.sessionService.currentUser.active === false) {
          this.alertService.showError('Disabled user');
        } else {
          this.authService.setAuthenticationState(true);
          this.nav.navigateRoot('dashboard');
        }
      }, (error) => {
        this.alertService.showNotification('bottom', 'right', 'danger', this.messageList.TRY_AGAIN);
        console.log(error);
      });
  }

  setAuthorities(role: boolean) {
    this.sessionService.isAdmin = role;
  }
}


  // async showError(text: String) {
  //   this.loading.dismiss();

  //   const alertct  = await this.alertCtrl.create({
  //     message: text,
  //     header: 'Fail',
  //     subHeader: 'Fail',
  //     buttons: ['OK']
  //   });
  //   await alertct.present();
  // }
// }
