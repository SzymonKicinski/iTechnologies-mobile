import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  createSuccess = false;
  registerCredentials = { email: '', password: '' };

  constructor(
    private nav: NavController,
    private auth: AuthenticationService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  presentAlert() {
    const alert = this.alertCtrl.create({
      message: 'Low battery',
      subHeader: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    // alert.present(); #TODO alert
  }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup('Success', 'Account created.');
      } else {
        this.showPopup('Error', 'Problem creating account.');
      }
    },
      error => {
        this.showPopup('Error', error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      message: title,
      subHeader: text,
      buttons: [
        {
          text: 'OK',
          // handler: data => {
          //   if (this.createSuccess) {
          //     this.nav.popToRoot();
          //   }
          // }
        }
      ]
    });
    // alert.present(); #TODO alert
  }
}
