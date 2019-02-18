import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router"

import { Alert } from '../../node_modules/@types/selenium-webdriver';
import * as _ from "lodash"
import { Globals } from './globals/global';
import { NgxSpinnerService } from 'ngx-spinner';


// import { stat } from 'fs';


var rootPath = "http://localhost:3000";


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})


export class DataService {
  status$: Object;
  private custId:String;

  constructor(private http: HttpClient, private router: Router,private global:Globals, private spinner: NgxSpinnerService) {
    this.custId=global.CUSTOMER_ID;
  }

  getUsers() {
    return this.http.get(rootPath + '/tasks');
  }

  getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + userId);
  }

  getAllFusebillServices() {
    /*return this.http.get('https://secure.fusebill.com/v1/Products?includePricing=true&includeGlCode=true', {
      headers: new HttpHeaders({
        'Authorization': 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN',
        'Content-Type': 'application/json'
      })
    });*/
    console.log("fusebill service");

    return this.http.get(rootPath + '/servicelist');

  }

  cancelSubscription(subscriptionId) {
    let statusCode;
    const subscriptionBody = { "subscriptionId": subscriptionId, "cancellationOption": "None" };
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post(rootPath + '/subscription/cancel', subscriptionBody, {
      headers: headers
    })
      .subscribe(data => {
        data => statusCode = data
        var json = JSON.parse(JSON.stringify(data));
        if (json.HttpStatusCode == 400) {
          alert("Something Went wrong! Please try again")
        } else {
          alert("Subscription cancelled successfully")
        }
      });

  }

  getMySubscription() {
    console.log('getMySubscription');
    return this.http.get(rootPath + '/mysubscriprions');
  }



  listUpgradeSubscriptions(subscriptionId) {
    return this.http.get(rootPath + '/subscription/listupgradesubscriptions/' + subscriptionId);
  }


  migrateSubsctiption(plansFamilyRltnId, subId) {
    let planBody;
    let plan;
    const migrationBody = {
      "customerId": this.custId,
      "planFamilyRelationshipId": plansFamilyRltnId,
      "migrationTimingOption": "Now",
      "subId": subId
    };
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    plan = this.http.post(rootPath + '/subscription/migratesubscription/', migrationBody, {
      headers: headers
    })
      .subscribe(data => {
        data => planBody = data
        var json = JSON.parse(JSON.stringify(data));
        if (json.HttpStatusCode == 400) {
          alert("Something Went wrong! Please try again")
          return planBody;

        } else {
          alert("Plan successfully migrated")
          return planBody;
        }
        // return data;
      });
    return planBody;
  }
  viewSubscriptionDetails(subId) {
    console.log("Angular viewSubscriptionDetails");
    return this.http.get(rootPath + '/mysubscription/viewSubscription/' + subId);
  }
  getPlanProducts(subId) {

    console.log('getPlanProducts ' + subId);
    return this.http.get(rootPath + '/planproducts/' + subId);
  }

  getPlanDetails(subId) {

    console.log('getPlanProducts ' + subId);
    return this.http.get(rootPath + '/plandetails/' + subId);
  }

  createSub(planFreID, customerID) {
    this.spinner.show();
    const subscriptionBody = { "customer": customerID, "plan": planFreID };
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic MDpRU2tCZlRkVGVVVGVYWTRyNllmZEhITlRKMEhmWHphdXZ5cEFmNFpYOEMwTnEwUm5sZHRlRXpWS2ttU3Z2dVdH')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post(rootPath + '/subscription/create', subscriptionBody, {
      headers: headers
    })
      .subscribe(data => {
        this.status$ = data;
        var json = JSON.parse(JSON.stringify(this.status$));
        
        
        // var json = JSON.parse(JSON.stringify(this.status$));

        // var subId = json.id;

        // //alert("DDD::>"+this.status$.id);
        // //let planID= this.status$.id;
        // const activationBody = { "subscriptionId": subId };
        // //const activationBody = { "subscriptionId": 12345 };
        // const headers = new HttpHeaders()
        //   .set('Authorization', 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN')
        //   .set('Content-Type', 'application/json')
        //   .set('Access-Control-Allow-Origin', '*');

        // return this.http.post(rootPath + '/subscription/activate', activationBody, {
        //   headers: headers
        // })
        //   .subscribe(data => {
        //     this.status$ = data
        //     var json = JSON.parse(JSON.stringify(this.status$))
        //   },
        //   err => {
        //     console.log(err)
        //   },() => {
        //     this.router.navigate(['SuccessMessage']);
        //   }
        // );




      },
        err => {
          console.log(err)
        },() => {
          var json = JSON.parse(JSON.stringify(this.status$));
         
          this.spinner.hide();
          if(json.statusCode == 200){
            this.router.navigate(['SuccessMessage']);
          }
          
        });
  }

  
  
  enableAutorenewal(subscriptionId, status) {
    return this.http.get(rootPath + '/mysubscription/autorenewal/' + subscriptionId + '/' + status);
  }

  disableAutorenewal(subscriptionId, status) {
    return this.http.get(rootPath + '/mysubscription/autorenewal/' + subscriptionId + '/' + status);


  }



checkCardDetails(custId){
  console.log('CustomerID '+custId);
  return this.http.get(rootPath+'/checkcarddetails/'+custId);
}

getMySubscriptionPlanDetails(){
  return this.http.get(rootPath+'/checkcarddetails/');
}

getSingleSignOnKey(custId){
  return this.http.get(rootPath+'/getsignlesignonkey/'+custId);
}

getSavedCardDetails(custId){
  return this.http.get(rootPath+'/checkcarddetails/'+custId);
}

}