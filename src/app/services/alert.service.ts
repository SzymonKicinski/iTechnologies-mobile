import { ItemsNewValueHandlerService } from './itemsNewValueHandler.service';
import { BarcodePage } from './../members/barcode/barcode.page';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ItemsService } from './items.service';

declare var alert: any;

@Injectable()
export class AlertService {

    constructor(
        private alertCtrl: AlertController,
        private itemsService: ItemsService
    ) {
    }

    showNotification(from, align, type, message) {
        alert.notify({
            icon: 'notifications',
            message: message

        }, {
                type: type,
                timer: 1000,
                placement: {
                    from: from,
                    align: align
                },
                template: '<div data-notify="container" style="width: 300px" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                    '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                    '<i class="material-icons" data-notify="icon">notifications</i> ' +
                    '<span data-notify="title">{1}</span> ' +
                    '<span data-notify="message">{2}</span>' +
                    '<div class="progress" data-notify="progressbar">' +
                    '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                    '</div>' +
                    '<a href="{3}" target="{4}" data-notify="url"></a>' +
                    '</div>'
            });
    }

    async showError(text) {

        const alertct = await this.alertCtrl.create({
            // message: text,
            header: 'Fail',
            subHeader: text,
            buttons: ['OK']
        });
        return await alertct.present();
    }
    async showSuccess(text) {

        const alertct = await this.alertCtrl.create({
            // message: text,
            header: 'Success',
            subHeader: text,
            buttons: ['OK']
        });
        return await alertct.present();
    }

    async showItem(item: Items) {
        const alertct = await this.alertCtrl.create({
            header: 'Item',
            inputs: [
                {
                    name: 'Serial number',
                    type: 'text',
                    value: `Serial number: ${item.serialNumberItem}`,
                    placeholder: `Serial number: ${item.serialNumberItem}`,
                    disabled: true,
                    label: 'Serial number'
                },
                {
                    name: 'Item name',
                    type: 'text',
                    id: 'item-name',
                    value: `Item name: ${item.itemName}`,
                    placeholder: `Item name: ${item.itemName}`,
                    disabled: true,
                    label: 'Item name'
                },
                {
                    name: 'Totality of item',
                    type: 'text',
                    id: 'Totality-of-item',
                    value: `Totality of item ${item.numberItem}`,
                    placeholder: `Totality of item: ${item.numberItem}`,
                    disabled: true,
                    label: 'Totality of item'
                },
                {
                    name: 'newTotalityOfItem',
                    type: 'number',
                    value: item.newNumberItem,
                    placeholder: 'New totality of item',
                    label: 'New totality of item',
                    checked: false
                },
                {
                    name: 'Status item',
                    type: 'text',
                    value: `Status item: 1`,
                    placeholder: 'Status item: 1',
                    disabled: true,
                    label: 'Status item'
                },
                {
                    name: 'Category',
                    type: 'text',
                    value: `Category ${item.category.id} : ${item.category.namecategory}`,
                    placeholder: `Category ${item.category.id} : ${item.category.namecategory}`,
                    disabled: true,
                    label: 'id : Category'
                },
                {
                    name: 'Bookstands',
                    type: 'text',
                    value: `Bookstands ${item.bookstands.numberBookstand} : ${item.bookstands.storehouses.location}`,
                    placeholder: `Bookstands ${item.bookstands.numberBookstand} : ${item.bookstands.storehouses.location}`,
                    disabled: true,
                    label: 'Number of bookstand : Location'
                },
                {
                    name: 'Brands',
                    type: 'text',
                    value: `Brand: ${item.brands.name}`,
                    placeholder: `${item.brands.name}`,
                    disabled: true,
                    label: 'Brands'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: data => {
                        debugger;
                        if (
                            item.category === null ||
                            item.serialNumberItem === null ||
                            item.numberItem === null ||
                            item.id === null ||
                            item.brands === null ||
                            item.itemName === null ||
                            // item.newNumberItem === null ||
                            data.newTotalityOfItem === null ||
                            item.statusItem === null ||
                            item.bookstands == null
                        ) {
                            this.showError('Error empty value of new totality of item');
                        } else {
                            if (Number(item.newNumberItem)) {
                                this.itemsService.updateItemAlert(item, data.newTotalityOfItem)
                                    .then((response => {
                                        if (response !== null ) {
                                            this.showSuccess('Item updated');
                                        }
                                    }))
                                    .catch((error => {
                                        this.showError('Server error');
                                    }));
                            } else if (Number(data.newTotalityOfItem)) {
                                this.itemsService.updateItemAlert(item, data.newTotalityOfItem)
                                    .then((response => {
                                        if (response !== null ) {
                                            this.showSuccess('Item updated');
                                        }
                                    }))
                                    .catch((error => {
                                        this.showError('Server error');
                                    }));
                            }

                        }
                    }
                }
            ]
        });
        return await alertct.present();
    }
}
