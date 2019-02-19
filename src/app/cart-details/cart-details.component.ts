import { Component, OnInit } from '@angular/core';
import { HideMenusService } from '../hide-menus.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../data.service';

import { Globals } from '../globals/global';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',  
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  empList: Array<any> = [];
  cartItems: Array<any> = [];
  grandTotal: number = 0;
  key$: Object;
private custId:String;
cardStatus: String;
  constructor(private data: DataService, public nav: HideMenusService, private spinner: NgxSpinnerService,private global:Globals) { 
    this.custId=global.CUSTOMER_ID;
  }


  ngOnInit() {
    sessionStorage.setItem("redirectPage",window.location.href);
    this.nav.show();
    this.cartItems = JSON.parse(sessionStorage.getItem('cartList'));
    this.cardStatus=sessionStorage.getItem("isCardAdded");
    this.cartItems.forEach(element => {
      this.grandTotal += element.amount;
    });

    // if(sessionStorage.getItem("fusebillRedirect")=="true" && this.cartItems.length>1){
    //   this.spinner.show();
    //   setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    //   }, 4000);
    //   this.cartItems.forEach(element => {
    //     var status = this.data.createSub(element.selectedFreId, this.custId);
    //   });
    //   sessionStorage.removeItem('cartList');
    //   var json = JSON.stringify(status);
    // }
    // sessionStorage.setItem("fusebillRedirect","false");
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
    // if(sessionStorage.getItem("isCardAdded")=="true"){
      // if (confirm("We will use your default card "+sessionStorage.getItem("cardNumner") +" for completing the payment. To add a new card for the payment go to the dashboard, click on Manage Card Details and make the card as Default")) {
      this.spinner.show();
      setTimeout(() => { 
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 4000);  
      checkOutItems.forEach(element => {
        var status = this.data.createSub(element.selectedFreId, this.custId);
      });
      sessionStorage.removeItem('cartList');
      var json = JSON.stringify(status);
    // }
    // }else{
    //   if (confirm("No card is added yet. Please clik Ok for add a new card.")) {
    //     sessionStorage.setItem("fusebillRedirect","true");
    //     this.spinner.show();
    //     this.data.getSingleSignOnKey(this.custId).subscribe(
    
    //       data => { this.key$ = data },
    //       err => {
    //         console.log(err)
    //       }, () => {
    //         window.location.href = 'https://zoftsolutions.mybillsystem.com/ManagedPortal/PaymentMethod?token=' + this.key$;
    //       }
    
    //     );
    //     setTimeout(() => {
    //       /** spinner ends after 5 seconds */
    //       this.spinner.hide();
    //     }, 3500);
    //   }
      
    // }
    


  }
}
