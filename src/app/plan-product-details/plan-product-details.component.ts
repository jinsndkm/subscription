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
  private custId: String;

  constructor(private data: DataService, private route: ActivatedRoute, public nav: HideMenusService, private spinner: NgxSpinnerService, private global: Globals) {
    this.custId = global.CUSTOMER_ID;
  }

  //t: number=0;


  ngOnInit() {

    

    if (sessionStorage.getItem("subId") != null && sessionStorage.getItem("subId") != 'null') {

      if (sessionStorage.getItem("isCardAdded") == "true") {
       

        if (confirm("We will use your default card " + sessionStorage.getItem("cardNumner") + " for completing the payment. To add a new card for the payment go to the dashboard, click on Manage Card Details and make the card as Default")) {

          this.spinner.show();
          var status = this.data.createSub(sessionStorage.getItem("subId"), this.custId);
          var json = JSON.stringify(status);

          sessionStorage.setItem("redirectPage", window.location.href);
          this.nav.show();

          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 4000);
        } else {
          
          sessionStorage.setItem("subId", 'null');
        }
      } else {
        
        if (confirm("You need at least one default payment method before subscribing a service. Please click ok to add a new payment method.")) {
          this.spinner.show();
          this.data.getSingleSignOnKey(this.custId).subscribe(

            data => { this.key$ = data },
            err => {
              console.log(err)
            }, () => {
              window.location.href = 'https://zoftsolutions.mybillsystem.com/ManagedPortal/PaymentMethod?token=' + this.key$;
            }

          );
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
          }, 3500);
        } else {
          
          sessionStorage.setItem("subId", 'null');
        }

      }

    }

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
          this.getTotalAmount(this.planProducts$[0].orderToCashCycles[1].planFrequencyId, "init")
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
    // alert(JSON.stringify(this.planProducts$).length)
    var json = JSON.parse(JSON.stringify(this.planProducts$));
    for (let j = 0; j < json.length; j++) {


      if (from == "change") {
        for (let i = 0; i < this.planProducts$[j].orderToCashCycles.length; i++) {

          if (this.planProducts$[j].orderToCashCycles[i].planFrequencyId == plnID) {

            sum = sum + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;
            this.grandTotal = sum;

            document.getElementById("test4" + j).innerHTML = "$" + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;

          }




        }

      } else {
        for (let i = 0; i < this.planProducts$[j].orderToCashCycles.length; i++) {


          if (this.planProducts$[j].orderToCashCycles[i].planFrequencyId == plnID) {

            sum = sum + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;
            this.grandTotal = sum;

            // document.getElementById("test4" + i).innerHTML = "$" + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;


          }






        }

      }
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
    sessionStorage.setItem("subId", s);
    if (sessionStorage.getItem("isCardAdded") == "true") {
      if (confirm("Click OK to continue payment using your saved card ending in " + sessionStorage.getItem("cardNumner") + ". To use a different payment method please select Manage Payment option in Home page.")) {

        this.spinner.show();

        var status = this.data.createSub(s, this.custId);
        var json = JSON.stringify(status);

      }else{
        sessionStorage.setItem("subId", 'null');
      }
    } else {
      if (confirm("You need to add a payment method to subscribe a service. Click OK to proceed")) {
        this.spinner.show();
        this.data.getSingleSignOnKey(this.custId).subscribe(

          data => { this.key$ = data },
          err => {
            console.log(err)
          }, () => {
            window.location.href = 'https://zoftsolutions.mybillsystem.com/ManagedPortal/PaymentMethod?token=' + this.key$;
          }

        );
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 3500);
      }else{
        sessionStorage.setItem("subId", 'null');
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
    this.freId$ = plnID;
    this.getTotalAmount(plnID, "change")
  }

  producttype = true;
}
