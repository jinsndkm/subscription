import { Component, OnInit, Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";

import * as _ from "lodash"

@Component({
  selector: 'app-plan-product-details',
  templateUrl: './plan-product-details.component.html',
  styleUrls: ['./plan-product-details.component.scss']
})
export class PlanProductDetailsComponent implements OnInit {

  planProducts$ : Object;
  planDetails$ : Object;
  grandTotal: number = 0;
  finalRes: Object;
  total: number =0;
  planarray:any = [];
  //t: number=0;

  constructor(private data:DataService, private route: ActivatedRoute ) { }
  
  ngOnInit() {
    var subId;
    this.route.params.subscribe(params => {
      console.log(params.id);
      subId = params.id;
    })
    this.data.getPlanProducts(subId).subscribe(
      data=>{this.planProducts$=data},
      err => {
          console.log(err)
      }, () =>{ 
        
        this.test()}

    );

    this.data.getPlanDetails(subId).subscribe(

      data=>{this.planDetails$=data},
      err => {
          console.log(err)
      }, () =>{ 
        
      }
     
    );

  



   
  }
 
  test(){
 
 
 
  let sum = 0;
   
  for(let products of _.values(this.planProducts$)){

// if(products.productType == 'RecurringService' && products.isIncludedByDefault == false){

// }else{
// sum+=products.orderToCashCycles[0].pricingModel.quantityRanges[0].prices[0].amount;
// }
sum+=products.orderToCashCycles[0].pricingModel.quantityRanges[0].prices[0].amount;
  }
  this.grandTotal = sum;
  return this.grandTotal;
}
   
    
  

  yourfunc(addonvalue,event){
   
  if(event.target.checked){
    this.grandTotal = this.grandTotal+parseInt(addonvalue);
  }else{
    this.grandTotal = this.grandTotal-parseInt(addonvalue);
  }
    
 //this.test('s',this.grandTotal);
    
  }

  subscribe(s){

    
    this.data.createSub(s,"4848884");
  }

  addtocart(planDetails){
    this.planarray=localStorage.getItem("Plans");
    if(this.planarray==null){
      this.planarray=[];
    }else{

this.planarray.push(planDetails);
localStorage.setItem("Plans",this.planarray);
alert(this.planarray.length)
  }
}
  producttype=true;
}
