import { Component, OnInit } from '@angular/core';
import { HideMenusService } from '../hide-menus.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',  
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  empList: Array<any> = [];
  cartItems: Array<any> = [];
  grandTotal: number = 0;

  constructor(private data: DataService, public nav: HideMenusService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.nav.show();
    this.cartItems = JSON.parse(sessionStorage.getItem('cartList'));
    this.cartItems.forEach(element => {
      this.grandTotal += element.amount;
    });
    console.log(JSON.stringify(this.cartItems));
  } 
  remove(cartModel) {
    // this.cartItems.splice(cartModel);   
    const index1 = this.cartItems.indexOf(cartModel);
    this.cartItems.splice(index1, 1);
    sessionStorage.setItem("cartList", JSON.stringify(this.cartItems));
    this.grandTotal=0;
    this.cartItems.forEach(element => {
      this.grandTotal += element.amount;
    });
  }
  subscribe(checkOutItems) {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 4000);
    checkOutItems.forEach(element => {
      var status = this.data.createSub(element.selectedFreId, "4849387");
    });
    sessionStorage.removeItem('cartList');
    var json = JSON.stringify(status);

  }
}
