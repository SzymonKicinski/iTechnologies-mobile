import { API_URL } from './api-connect';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import axios, { AxiosPromise } from 'axios';


@Injectable()
export class CategoryService {

    constructor(
        private alertService: AlertService) {
    }

    getCategories(): any {
        const path = API_URL + `/category`;
        return axios.get(path, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .catch((error) => {
                console.log('Category service getCategorys');
                console.log(error);
            });
    }

    addNewCategory(category: Category) {
        const path = API_URL + `/category/new`;
        const body = {
            nameCategory: category.namecategory
        };
        return axios.post(path, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .catch((error) => {
                console.log('Category service - not add new category');
                console.log(error);
            });
    }

    deleteCategory(category) {
        const path = API_URL + `/category/delete/${category.id}`;
        return axios.delete(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateCategory(category) {
        const path = API_URL + `/category/update/${category.id}`;
        const body = {
            nameCategory: category.namecategory
        };
        return axios.put(path, body, {headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }});
    }
}
