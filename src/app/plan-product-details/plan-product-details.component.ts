import { Component, OnInit, Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { HideMenusService } from '../hide-menus.service';
import * as _ from "lodash"
import { Globals } from '../globals/global';

@Component({
  selector: 'app-plan-product-details',
  templateUrl: './plan-product-details.component.html',
  styleUrls: ['./plan-product-details.component.scss']
})
export class PlanProductDetailsComponent implements OnInit {
  
  planProducts$: Object;
  planDetails$: Object;
  productDetails$: Object;
  grandTotal: number = 0;
  finalRes: Object;
  total: number = 0;
  planarray: any = [];
  oldsession$: Object;
  empList: Array<any> = [];
  cartItems: Array<any> = [];
  noOfCartItems: number = 0;
  freId$: Object;
  tempPlanProducts$: Object;

  amount: number = 0;

  key$: Object;
  //t: number=0;
  private custId: String;
  cardStatus: String;
   productName:String;

  constructor(private data: DataService, private route: ActivatedRoute, public nav: HideMenusService, private spinner: NgxSpinnerService, private global: Globals) {
    this.custId = global.CUSTOMER_ID;
  }

  //t: number=0;


  ngOnInit() {
    // if(sessionStorage.getItem("subId")!=null){
    //   this.spinner.show();
    //   var status = this.data.createSub(sessionStorage.getItem("subId"), this.custId);
    //   var json = JSON.stringify(status);
    //   sessionStorage.setItem("subId",null);
    //   setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    //   }, 4000);
    // }
    this.spinner.show();
    this.cardStatus = sessionStorage.getItem("isCardAdded");
    sessionStorage.setItem("redirectPage", window.location.href);
    this.nav.show();
    var subId;
    
    this.route.params.subscribe(params => {
      console.log(params.id);
      subId = params.id;

      this.productName=params.name;

      sessionStorage.setItem("product_id", subId);

    })

    this.data.getPlanProducts(subId).subscribe(
      data => {
        var json = JSON.parse(JSON.stringify(data));
        this.planProducts$ = json.data;

      },
      err => {
        console.log(err)
      }, () => {
        this.spinner.hide();

        // if (this.planProducts$[0].orderToCashCycles.length == 1) {

        //   this.getTotalAmount(this.planProducts$[0].orderToCashCycles[0].planFrequencyId, "init")
        // } else {
        //   this.getTotalAmount(this.planProducts$[0].orderToCashCycles[0].planFrequencyId, "init")
        // }



      }

    );
    this.data.getPlanDetails(subId).subscribe(

      data => {
        var json = JSON.parse(JSON.stringify(data));
        this.planDetails$ = json;
      },
      err => {
        console.log(err)
      }, () => {

      }

    );
    this.data.getProductDetails(subId).subscribe(

      data => {
        var json = JSON.parse(JSON.stringify(data));
        this.productDetails$ = json;
      },
      err => {
        console.log(err)
      }, () => {

      }

    );

    this.oldsession$ = sessionStorage.getItem('cartList');
    if (this.oldsession$ == null) {
    } else {
      this.cartItems = JSON.parse(sessionStorage.getItem('cartList'));

    }




  }
  totalAmo(setupCharge, amount) {
    var setUp = parseInt(setupCharge);
    this.grandTotal=setUp + amount
    return setUp + amount;
  }

  // getTotalAmount(plnID, from) {

  //   let sum = 0;
  //   let count = 0;
  //   for (let j = 0; j < JSON.stringify(this.planProducts$).length; j++) {


  //     if (from == "change") {
  //       for (let i = 0; i < this.planProducts$[j].orderToCashCycles.length; i++) {
  //         if (this.planProducts$[j].orderToCashCycles[i].planFrequencyId == plnID) {

  //           sum = sum + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;
  //           this.grandTotal = sum;

  //           document.getElementById("test4" + j).innerHTML = "$" + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;

  //         }




  //       }
  //     } else {
  //       for (let i = 0; i < this.planProducts$[j].orderToCashCycles.length; i++) {

  //         //alert(this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount);
  //         // if(products.productType == 'RecurringService' && products.isIncludedByDefault == false){

  //         // }else{
  //         // sum+=products.orderToCashCycles[0].pricingModel.quantityRanges[0].prices[0].amount;
  //         // }
  //         //alert(this.planProducts$[j].orderToCashCycles[i].planFrequencyId)


  //         if (this.planProducts$[j].orderToCashCycles[i].planFrequencyId == plnID) {

  //           sum = sum + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;
  //           this.grandTotal = sum;

  //           document.getElementById("test4" + j).innerHTML = "$" + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;


  //         }






  //       }

  //     }
  //     count++;
  //   }

  //   return this.grandTotal;
  // }













  onChange(deviceValue) {
    this.freId$ = deviceValue;
  }


  addtocart(planDetails) {
    window.scrollTo(0, 0)
    if (typeof this.freId$ === "undefined") {
      planDetails.selectedFreId = planDetails.id;
    } else {
      planDetails.selectedFreId = this.freId$;
    }


    // this.data.getPlanProducts(planDetails.id).subscribe(
    //   data => { this.tempPlanProducts$ = data },
    //   err => {
    //     console.log(err)
    //   }, () => {

    //     // this.test()
    //   }

    // );
    let total = planDetails.amount;
    // for (let products of _.values(this.planProducts$)) {
    //   for (let corderToCash of products.orderToCashCycles) {
    //     if (corderToCash.planFrequencyId == planDetails.selectedFreId) {
    //       total += corderToCash.pricingModel.quantityRanges[0].prices[0].amount;
    //     }
    //   }

    // }

    planDetails.grandTotal = this.grandTotal;

    console.log(sessionStorage.getItem('cartList'));
    this.oldsession$ = sessionStorage.getItem('cartList');
    if (this.oldsession$ == null) {
    } else {
      this.empList = JSON.parse(sessionStorage.getItem('cartList'));
    }
    this.empList.push(planDetails);
    this.cartItems.push(planDetails);
    sessionStorage.setItem("cartList", JSON.stringify(this.empList));
  }

  getPlanId(plnID) {
    this.freId$ = plnID;
  }

  producttype = true;
}
