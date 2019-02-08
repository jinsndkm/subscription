import { Component, OnInit, Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { HideMenusService } from '../hide-menus.service';
import * as _ from "lodash"

@Component({
  selector: 'app-plan-product-details',
  templateUrl: './plan-product-details.component.html',
  styleUrls: ['./plan-product-details.component.scss']
})
export class PlanProductDetailsComponent implements OnInit {

  planProducts$: Object;
  planDetails$: Object;
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

  key$: Object;
  //t: number=0;

  constructor(private data: DataService, private route: ActivatedRoute,public nav: HideMenusService, private spinner: NgxSpinnerService) { }

  //t: number=0;


  ngOnInit() {
    sessionStorage.setItem("redirectPage",window.location.href);
    this.nav.show();
    var subId;
    this.route.params.subscribe(params => {
      console.log(params.id);
      subId = params.id;
    })
    this.data.getPlanProducts(subId).subscribe(
      data => { this.planProducts$ = data },
      err => {
        console.log(err)
      }, () => {


        if (this.planProducts$[0].orderToCashCycles.length == 1) {

          this.getTotalAmount(this.planProducts$[0].orderToCashCycles[0].planFrequencyId, "init")
        } else {
          this.getTotalAmount(this.planProducts$[0].orderToCashCycles[0].planFrequencyId, "init")
        }



      }

    );

    this.data.getPlanDetails(subId).subscribe(

      data => { this.planDetails$ = data },
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

  getTotalAmount(plnID, from) {

    let sum = 0;
    let count = 0;
    for (let j = 0; j < JSON.stringify(this.planProducts$).length; j++) {


      if (from == "change") {
        for (let i = 0; i < this.planProducts$[j].orderToCashCycles.length; i++) {
          if (this.planProducts$[j].orderToCashCycles[i].planFrequencyId == plnID) {

            sum = sum + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;
            this.grandTotal = sum;

            document.getElementById("test4" +j).innerHTML = "$" + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;

          }




        }
      } else {
        for (let i = 0; i < this.planProducts$[j].orderToCashCycles.length; i++) {

          //alert(this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount);
          // if(products.productType == 'RecurringService' && products.isIncludedByDefault == false){

          // }else{
          // sum+=products.orderToCashCycles[0].pricingModel.quantityRanges[0].prices[0].amount;
          // }
          //alert(this.planProducts$[j].orderToCashCycles[i].planFrequencyId)


          if (this.planProducts$[j].orderToCashCycles[i].planFrequencyId == plnID) {

            sum = sum + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;
            this.grandTotal = sum;

            document.getElementById("test4"+j).innerHTML = "$"+this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;


          }






        }

      }
      count++;
    }

    return this.grandTotal;
  }




  yourfunc(addonvalue, event) {

    if (event.target.checked) {
      this.grandTotal = this.grandTotal + parseInt(addonvalue);
    } else {
      this.grandTotal = this.grandTotal - parseInt(addonvalue);
    }

    //this.test('s',this.grandTotal);

  }

  subscribe(s) {
    if(sessionStorage.getItem("isCardAdded")=="true"){
      if (confirm("Are you sure want to subscribe using the card "+sessionStorage.getItem("cardNumner"))) {
    
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 4000);
    var status = this.data.createSub(s, "4871251");
    var json = JSON.stringify(status);
  }}else{
    if (confirm("No card is added yet. Please clik Ok for add a new card.")) {
      this.spinner.show();
      this.data.getSingleSignOnKey("4871251").subscribe(
  
        data => { this.key$ = data },
        err => {
          console.log(err)
        }, () => {
          window.location.href = 'https://solutions.mybillsystem.com/ManagedPortal/PaymentMethod?token=' + this.key$;
        }
  
      );
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 3500);
    }
    
  }

  }






  onChange(deviceValue) {
    this.freId$ = deviceValue;
  }


  addtocart(planDetails) {
    if (typeof this.freId$ === "undefined") {
      planDetails.selectedFreId = planDetails.planFrequencies[0].id;
    } else {
      planDetails.selectedFreId = this.freId$;
    }


    this.data.getPlanProducts(planDetails.id).subscribe(
      data => { this.tempPlanProducts$ = data },
      err => {
        console.log(err)
      }, () => {

        // this.test()
      }

    );
    let total = 0;
    for (let products of _.values(this.planProducts$)) {
      for (let corderToCash of products.orderToCashCycles) {
        if (corderToCash.planFrequencyId == planDetails.selectedFreId) {
          total += corderToCash.pricingModel.quantityRanges[0].prices[0].amount;
        }
      }

    }

    planDetails.amount = total;

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

  getAmount(plnID) {
    this.getTotalAmount(plnID, "change")
  }

  producttype = true;
}
