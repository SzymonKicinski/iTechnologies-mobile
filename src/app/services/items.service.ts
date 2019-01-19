import { API_URL } from './api-connect';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import axios, { AxiosPromise } from 'axios';


@Injectable()
export class ItemsService {


    constructor(
        private sessionService: SessionService) {
    }

    getItems() {
        const path = API_URL + `/items`;
        return axios.get(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .catch((error) => {
                console.log('Item service getItems');
                console.log(error);
            });
    }

    addNewItem(item: Items) {
        const path = API_URL + `/item/new2`;
        const body = {
            serialNumberItem: item.serialNumberItem,
            itemName: item.itemName,
            statusItem: 0,
            numberItem: +item.numberItem,
            newNumberItem: item.newNumberItem,
            brands: item.brands.name,
            bookstands: item.bookstand.value ,
            category: item.category.name,
            user_id: this.sessionService.currentUser.data.id
        };
        console.log(body);
        return axios.post(path, body, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        });
    }

    deleteItem(item) {
        const path = API_URL + `/items/delete/${item.serialNumberItem}`;
        return axios.delete(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateItem(item) {
        const path = API_URL + `/items/update`;
        const body = {
            serialNumberItem: item.serialNumberItem,
            itemName: item.itemName,
            numberItem: item.numberItem,
            statusItem: 0,
            newNumberItem: item.newNumberItem
        };
        return axios.put(path, body, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateItemAlert(item, data) {
        const path = API_URL + `/items/update`;
        const body = {
            serialNumberItem: item.serialNumberItem,
            itemName: item.itemName,
            numberItem: item.numberItem,
            statusItem: 1,
            newNumberItem: data
        };
        return axios.put(path, body, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    getItem(serialNumberItem) {
        const path = API_URL + `/item/${serialNumberItem}`;
        return axios.get(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .catch((error) => {
                console.log('Item service getItem');
                console.log(error);
            });
    }
}
