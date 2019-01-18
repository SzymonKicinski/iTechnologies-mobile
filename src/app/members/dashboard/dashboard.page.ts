import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  rootPage: any = 'LoginPage';
  public appPages = [
    {
      title: 'dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'barcode',
      url: '/barcode',
      icon: 'list'
    }
  ];
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
