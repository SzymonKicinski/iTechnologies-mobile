import { BarcodePage } from './../members/barcode/barcode.page';
import { API_URL } from './api-connect';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import axios, { AxiosPromise } from 'axios';


@Injectable()
export class ItemsNewValueHandlerService {

    constructor(
        private barcodePage: BarcodePage
    ) {

    }

    setNewValueOfTotalityItem( data, item ) {
        this.barcodePage.updateNewItem(item);
    }
}
