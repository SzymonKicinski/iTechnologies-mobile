import { ItemsNewValueHandlerService } from './services/itemsNewValueHandler.service';
import { BrandService } from './services/brand.service';
import { StorehousesService } from './services/storehouses.service';
import { BookstandService } from './services/bookstand.service';
import { CategoryService } from './services/category.service';
import { ItemsService } from './services/items.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { UserApiService } from './services/user-api.service';
import { SessionService } from './services/session.service';
import { AlertService } from './services/alert.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    CommonModule
  ],
  providers: [
    StatusBar,
    ItemsService,
    CategoryService,
    BookstandService,
    StorehousesService,
    BrandService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AlertService,
    SessionService,
    UserApiService,
    LoginService,
    ItemsNewValueHandlerService,
    CommonModule,
    BarcodeScanner
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
