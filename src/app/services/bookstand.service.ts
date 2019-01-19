import { API_URL } from './api-connect';
import { StorehousesService } from './storehouses.service';
import { Injectable } from '@angular/core';
import axios from 'axios';

import { AlertService } from './alert.service';


@Injectable()
export class BookstandService {


    constructor(
        private alertService: AlertService,
        private storehousesService: StorehousesService) {
    }

    getBookstands(): any {
        const path = API_URL + `/bookstands`;
        return axios.get(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log('Brand service getBrands');
                console.log(error);
            });
    }

    addNewBookstand(bookstand: Bookstand) {
        console.log('Bookstand');
        console.log(bookstand);
        const path = API_URL + `/bookstands/new`;
        const body = {
            numberBookstand: bookstand.numberBookstand,
            storehouses_id: bookstand.storehouses_location
        };
        //                 /\ zamiast dwojki wez z bookstand id!!!!!
        console.log('body');
        console.log(body);
        return axios.post(path, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .catch((error) => {
                console.log('Brand service - add new brand');
                console.log(error);
            });
    }



    deleteBookstand(bookstand) {
        const path = API_URL + `/bookstands/delete/${bookstand.id}`;
        return axios.delete(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateBookstand(bookstand) {
        const path = API_URL + `/bookstands/update/${bookstand.id}`;
        const body = {
            numberBookstand: bookstand.numberBookstand,
            storehouses_id: bookstand.storehouses[0].id
        };
        return axios.put(path, body, {headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }});
    }
}
