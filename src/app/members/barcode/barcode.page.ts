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
        for (const bookstand of this.bookstandsList) {
          this.dropDownInterfaceBookstand.push(
            {
              name: bookstand.storehouses.location,
              value: bookstand.id,
              label: `${bookstand.id} : ${bookstand.storehouses.location}`
            }
          );
        }
      });
  }
  getCategiresLis() {
    this.categoryService.getCategories()
      .then((response) => {
        this.categoriesList = response.data;
        for (const category of this.categoriesList) {
          this.dropDownInterfaceCategories.push(
            {
              name: category.namecategory,
              value: category.id,
              label: `${category.id} : ${category.namecategory}`
            }
          );
        }
      });

  }
  getBrandsList() {
    this.brandService.getBrands()
      .then((response) => {
        this.brandsList = response.data;
        for (const brand of this.brandsList) {
          this.dropDownInterfaceBrand.push(
            {
              name: brand.name,
              value: brand.id,
              label: `${brand.id} : ${brand.name}`
            }
          );
        }
      });
  }

  getItemsList() {
    this.itemsService.getItems()
      .then((response: any) => {
        this.itemsList = <Items[]>response.data.content;
      })
      .catch((error) => {
        console.log(error);
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
      this.scannedData = barcodeData;
      this.searchItemByCode();
  }).catch(err => {
    this.alertService.showError('Inncorrect barcode!');
    });
  }

  searchItemByCode() {
    if (this.scannedData === null || this.scannedData === undefined) {
      this.alertService.showError('Empty serial number!');
    } else {
      this.itemsService.getItem(this.scannedData.text)
        .then((response: any) => {
          if (response === undefined) {
            this.alertService.showError('Incorrect barcode!');
          } else {
            this.alertService.showItem(response.data);
          }
        }, (error) => {
          this.alertService.showError('Incorrect barcode!');
          console.log(error);
        });
    }
  }

  updateNewItem(item) {
    item.category = this.findCategory(item.category.id);
    item.bookstand = this.findBookstand(item.bookstands.id);
    item.brands = this.findBrand(item.brands.id);
    this.itemsService.updateItem(item)
      .then((response) => {
        this.alertService.showSuccess('Updated item');
        this.ngOnInit();
      })
      .catch((error) => {
        console.log(error);
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

