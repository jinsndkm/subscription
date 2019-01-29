import { Component, OnInit, Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

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



  //t: number=0;

  constructor(private data: DataService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  //t: number=0;


  ngOnInit() {
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






  }

  getTotalAmount(plnID, from) {

    let sum = 0;
    let count = 0;
    for (let j = 0; j < JSON.stringify(this.planProducts$).length; j++) {


      if (from == "change") {
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

            document.getElementById("test4" + j).innerHTML = "$" + this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;


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

            //document.getElementById("test4"+j).innerHTML = "$"+this.planProducts$[j].orderToCashCycles[i].pricingModel.quantityRanges[0].prices[0].amount;


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
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 4000);
    var status = this.data.createSub(s, "4871251");
    var json = JSON.stringify(status);
   
  }

  


 

  addtocart(planDetails) {
    this.planarray = localStorage.getItem("Plans");
    if (this.planarray == null) {
      this.planarray = [];
    } else {


      this.planarray.push(planDetails);
      localStorage.setItem("Plans", this.planarray);
      alert(this.planarray.length)
    }
  }

  getAmount(plnID) {
    this.getTotalAmount(plnID, "change")
  }

  producttype = true;
}
