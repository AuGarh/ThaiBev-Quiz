import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { Product } from '../../models/product.model';
import { ProductService } from '../../serives/product.service';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../serives/shared.service';
import { QRCodeComponent } from "angularx-qrcode"
import { DialogModule } from 'primeng/dialog';


@Component({
    selector: 'home',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TableModule,
        InputMaskModule,
        QRCodeComponent,
        DialogModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    products: Product[] | undefined;

    productCode: string = '';
    QRProductCode: string = '';

    visibleQRModal: boolean = false;

    constructor(
        private productService: ProductService,
        private sharedService: SharedService
    ) { }

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.sharedService.showLoading();
        this.productService.getProductList().subscribe(
            (res: Product[]) => {
                this.products = res;
                this.sharedService.hideLoading();
            }
        );
    }

    addProduct() {
        this.productCode = this.productCode.trim().toUpperCase();
        const isDuplicate = this.products?.some(product => product.productCode === this.productCode);
        if (isDuplicate) {
            this.sharedService.showAlert('error', 'รหัสสินค้านี้มีอยู่แล้ว');
            return;
        }
        this.productService.createProduct(this.productCode).subscribe(
            () => {
                this.sharedService.hideLoading();
                this.sharedService.showAlert('success', 'สร้างสินค้าสำเร็จ',
                  () => {
                    this.getProducts();
                    this.productCode = '';
                  });
            }
        );
    }

    deleteProduct(product: Product) {
        this.sharedService.showAlert('warning', `ต้องการลบข้อมูล รหัสสินค้า <br> ${product.productCode} <br> หรือไม่?`, () => {
            this.sharedService.showLoading();
            this.productService.deleteProduct(product.id).subscribe(
                () => {
                    this.getProducts();
                }
            );
        });
    }

    showQRModal(product: Product) {
        this.QRProductCode = product.productCode;
        this.visibleQRModal = true;
    }

    closeQRModal() {
        this.QRProductCode = '';
        this.visibleQRModal = false;
    }
}
