import { API_URL } from './api-connect';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import axios, { AxiosPromise } from 'axios';


@Injectable()
export class BrandService {


    constructor() {
    }

    getBrands(): any {
        const path = API_URL + `/brands`;
        return axios.get(path, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .catch((error) => {
                console.log('Brand service getBrands');
                console.log(error);
            });
    }

    addNewBrand(brand: Brand) {
        const path = API_URL + `/brands/new`;
        const body = {
            brandName: brand.name
        };
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

    deleteBrand(brand) {
        const path = API_URL + `/brand/delete/${brand.id}`;
        return axios.delete(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateBrand(brand) {
        const path = API_URL + `/brand/update/${brand.id}`;
        const body = {
            brandName: brand.name
        };
        return axios.put(path, body, {headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }});
    }
}
