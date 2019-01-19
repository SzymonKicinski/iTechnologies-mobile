import { BrandService } from './../../services/brand.service';
import { CategoryService } from './../../services/category.service';
import { BookstandService } from './../../services/bookstand.service';
import { AlertService } from './../../services/alert.service';
import { SessionService } from './../../services/session.service';
import { ItemsService } from './../../services/items.service';
import { Component, OnInit } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
})
export class BarcodePage implements OnInit {
  // Barcode scanner variable
  scannedData: BarcodeData = new BarcodeData(
    null,
    null,
    false
  );
  barcodeScannerOptions: BarcodeScannerOptions;

  // Items list
  itemsList: Items[] = [];
  selectedItem: Items;


  // Brands List
  brandsList: Brand[] = [];
  // Categories List
  categoriesList: Category[] = [];
  // Bookstands List
  bookstandsList: Bookstand[] = [];
  // Dropdown interafce
  dropDownInterfaceBookstand: ClassDropdownMe[] = [];
  dropDownInterfaceCategories: ClassDropdownMe[] = [];
  dropDownInterfaceBrand: ClassDropdownMe[] = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private itemsService: ItemsService,
    private sessionService: SessionService,
    private alertService: AlertService,
    private bookstandService: BookstandService,
    private categoryService: CategoryService,
    private brandService: BrandService) {
    // Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  ngOnInit(
  ) {
    this.getBookstandsList();
    this.getCategiresLis();
    this.getBrandsList();
  }

  getBookstandsList() {
    this.bookstandService.getBookstands()
      .then((response) => {
        this.bookstandsList = response.data;
        // console.log(this.bookstandsList);
        for (const bookstand of this.bookstandsList) {
          this.dropDownInterfaceBookstand.push(
            {
              name: bookstand.storehouses.location,
              value: bookstand.id,
              label: `${bookstand.id} : ${bookstand.storehouses.location}`
            }
          );
        }
        // console.log('dropDownInterfaceBookstand');
        // console.log(this.dropDownInterfaceBookstand);
      });
  }
  getCategiresLis() {
    this.categoryService.getCategories()
      .then((response) => {
        this.categoriesList = response.data;
        // console.log(this.categoriesList);
        for (const category of this.categoriesList) {
          this.dropDownInterfaceCategories.push(
            {
              name: category.namecategory,
              value: category.id,
              label: `${category.id} : ${category.namecategory}`
            }
          );
        }
        // console.log('dropDownInterfaceCategories');
        // console.log(this.dropDownInterfaceCategories);
      });

  }
  getBrandsList() {
    this.brandService.getBrands()
      .then((response) => {
        this.brandsList = response.data;
        // console.log(this.brandsList);
        for (const brand of this.brandsList) {
          this.dropDownInterfaceBrand.push(
            {
              name: brand.name,
              value: brand.id,
              label: `${brand.id} : ${brand.name}`
            }
          );
        }
        // console.log('dropDownInterfaceBrand');
        // console.log(this.dropDownInterfaceBrand);
      });
  }

  getItemsList() {
    this.itemsService.getItems()
      .then((response: any) => {
        this.itemsList = <Items[]>response.data.content;
        // console.log('this.itemsList');
        // console.log(this.itemsList);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  findSelectedItemIndex(): number {
    return this.itemsList.indexOf(this.selectedItem);
  }

  findBookstand(bookstand): ClassDropdownMe {
    return this.dropDownInterfaceBookstand.find(item => item.value === bookstand);
  }

  findCategory(category): ClassDropdownMe {
    return this.dropDownInterfaceCategories.find(item => item.value === category);
  }

  findBrand(brand): ClassDropdownMe {
    return this.dropDownInterfaceBrand.find(item => item.value === brand);
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      debugger;
      this.searchItemByCode();
      alert('Barcode data ' + JSON.stringify(barcodeData));
      this.scannedData = barcodeData;
      // console.log('this.scanCode');
      // console.log(this.scanCode);

    }).catch(err => {
      // console.log('Error', err);
    });
  }

  searchItemByCode() {
    debugger;
    if (this.scannedData === null || this.scannedData === undefined) {
      this.alertService.showError('Empty serial number!');
    } else {
      debugger;
      this.itemsService.getItem(this.scannedData.text)
        .then((response: any) => {
          debugger;
          if (response === undefined) {
            debugger;
            this.alertService.showError('Incorrect barcode!');
          } else {
            debugger;
            // console.log(response);
            // this.item = response.data;
            this.alertService.showItem(response.data);
            // this.cloneItemToEdit.id = response.data.id;
            // this.cloneItemToEdit.serialNumberItem = response.data.serialNumberItem;
            // this.cloneItemToEdit.itemName = response.data.itemName;
            // this.cloneItemToEdit.numberItem = response.data.numberItem;
            // this.cloneItemToEdit.statusItem = response.data.statusItem;
            // this.cloneItemToEdit.newNumberItem = response.data.newNumberItem;
            // this.cloneItemToEdit.brands.id = response.data.brands.id
            // this.cloneItemToEdit.brands.name = response.data.brands.name;
            // this.cloneItemToEdit.bookstands.id = response.data.bookstands.id;
            // this.cloneItemToEdit.bookstands.numberBookstand = response.data.bookstands.numberBookstand;
            // this.cloneItemToEdit.bookstands.storehouses.id = response.data.bookstands.storehouses.id;
            // this.cloneItemToEdit.bookstands.storehouses.location = response.data.bookstands.storehouses.location;
            // this.cloneItemToEdit.category.id = response.data.category.id;
            // this.cloneItemToEdit.category.namecategory = response.data.category.namecategory;
            // console.log(this.cloneItemToEdit);
            // this.displayDialog = true;
            // this.newItems = false;
          }
        }, (error) => {
          this.alertService.showError('Incorrect barcode!');
          // console.log(error);
        });
    }
  }

  updateNewItem(item) {
    item.category = this.findCategory(item.category.id);
    item.bookstand = this.findBookstand(item.bookstands.id);
    item.brands = this.findBrand(item.brands.id);
    // console.log(item);
    this.itemsService.updateItem(item)
      .then((response) => {
        this.alertService.showSuccess('Updated item');
        // this.displayDialog = false;
        this.ngOnInit();
      })
      .catch((error) => {
        // console.log(error);
        this.alertService.showError('Error during upgrade');
        this.ngOnInit();
      });

  }



}

class ClassItems implements Items {

  constructor(
    public id?,
    public serialNumberItem?,
    public itemName?,
    public numberItem?,
    public statusItem?,
    public newNumberItem?,
    public brands?: {
      id?: number,
      name?: string
    },
    public bookstands?: {
      id?: number,
      numberBookstand?: number,
      storehouses?: {
        id?: number,
        location?: string
      },
    },
    public category?: {
      id?: number,
      namecategory?: string
    }) {
  }
}

class ClassDropdownMe implements DropDownMe {

  constructor(
    public name?,
    public value?,
    public label?
  ) { }
}

class BarcodeData implements IBarcode {

  constructor(
    public text?,
    public format?,
    public cancelled?
  ) { }
}

