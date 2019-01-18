
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';


@Injectable()
export class LoginService {
    pathUsers = 'http://localhost:8080/api/it';

    messageList = {
        LOGIN_SUCCESS: 'Logged',
        TRY_AGAIN: 'Try again',
        DISABLED: 'Disabled account',
        TIME_OUT: 'Time out!',
    };

    constructor
        (
        private alertService: AlertService
        ) {
    }


    signUp(username, email, password) {
        const body = {
            username: username,
            email: email,
            password: password
        };
        const path = this.pathUsers + '/register';
        const headers = this.getContent();

        return axios.post(path, body, { headers: headers });
    }

    private getContent() {
        return new HttpHeaders()
            .set('Content-Type', 'application/json');
    }


}
