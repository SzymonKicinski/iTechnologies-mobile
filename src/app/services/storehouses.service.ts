import { API_URL } from './api-connect';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import axios, { AxiosPromise } from 'axios';


@Injectable()
export class StorehousesService {


    constructor(
        private alertService: AlertService) {
    }

    getStorehouses() {
        const path = API_URL + `/storehouses`;
        return  axios.get(path)
            .then((response => {
                console.log(response.data);
                return response.data;
            }))
            .catch((error => {
                console.log('Storehouses service - get array of storehouses');
                console.log(error);
            }));
    }

    addNewStorehouses(storehouses: Storehouses) {
        const path = API_URL + `/storehouses/new`;
        const body = {
            location: storehouses.location
        };
        return axios.post(path, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log('Response from addNewStorehouses');
            console.log(response);
        })
            .catch((error) => {
                console.log('Storehouses service - add new storehouses');
                console.log(error);
            });
    }

    deleteStorehouse(storehouses) {
        const path = API_URL + `/storehouses/delete/${storehouses.id}`;
        return axios.delete(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateStorehouse(storehouses) {
        const path = API_URL + `/storehouses/update/${storehouses.id}`;
        const body = {
            location: storehouses.location
        };
        return axios.put(path, body, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        );
    }


    findStorehousesByLocation(location: string): any {
        const path = API_URL + `/storehouses?location=${location}`;
        return axios.get(path)
            .then((response) => {
                console.log('Response from findStorehousesByLocation');
                console.log(response.data);
            })
            .catch((error) => {
                console.log('Storehouses service findStorehousesByLocation');
                console.log(error);
            });
    }
}
