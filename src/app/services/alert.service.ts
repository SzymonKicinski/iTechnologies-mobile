import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

declare var alert: any;

@Injectable()
export class AlertService {

    constructor(private alertCtrl: AlertController) {
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

    async showItem(item: Items) {
        const alertct = await this.alertCtrl.create({
            header: 'Item',
            inputs: [
                {
                    name: 'Serial number',
                    type: 'number',
                    placeholder: 'Barcode',
                    value: item.serialNumberItem,
                    disabled: true
                },
                {
                    name: 'Item name',
                    type: 'text',
                    id: 'item-name',
                    value: item.itemName,
                    placeholder: 'Item name',
                    disabled: true
                },
                {
                    name: 'Totality of item',
                    type: 'number',
                    value: item.numberItem,
                    placeholder: 'Totality of item',
                    disabled: true
                },
                // input date with min & max
                {
                    name: 'New totality of item',
                    type: 'number',
                    value: item.newNumberItem,
                    placeholder: 'New totality of item'
                },
                {
                    name: 'Status item',
                    type: 'number',
                    value: 1,
                    placeholder: 'Status item',
                    disabled: true
                },
                {
                    name: 'Category',
                    type: 'text',
                    value: item.category.id,
                    placeholder: `${item.category.id} : ${item.category.namecategory}`,
                    disabled: true
                },
                {
                    name: 'Bookstands',
                    type: 'text',
                    value: item.bookstands.id,
                    placeholder: `${ item.bookstands.numberBookstand } : ${ item.bookstands.storehouses.location }`,
                    disabled: true
                },
                {
                    name: 'Brands',
                    type: 'text',
                    value: item.brands.id,
                    placeholder: `${ item.brands.name }`,
                    disabled: true
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
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });
        return await alertct.present();
    }
}
