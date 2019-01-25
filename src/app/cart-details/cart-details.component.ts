import { Component, OnInit } from '@angular/core';
import { HideMenusService } from '../hide-menus.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  empList: Array<any> = [];
  cartItems: Array<any> = [];
  constructor(public nav: HideMenusService) { }

  ngOnInit() {
    this.nav.show();
    this.cartItems = JSON.parse(sessionStorage.getItem('cartList'));

   
    console.log(JSON.stringify(this.cartItems));
  }
  remove(cartModel) {
    alert(JSON.stringify(cartModel));
    // alert(cartModel);
    this.cartItems.slice(cartModel);
    JSON.stringify(this.cartItems)
    alert(this.cartItems.length);
  }
}
