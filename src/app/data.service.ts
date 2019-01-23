import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Alert } from '../../node_modules/@types/selenium-webdriver';
import * as _ from "lodash"

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

  constructor(private http: HttpClient) {
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
        alert("DDD::>"+JSON.stringify(data))
      });
   
  }

  getMySubscription(){
    console.log('getMySubscription');
    return this.http.get(rootPath+'/mysubscriprions');
  }
  getPlanProducts(subId){
    
    console.log('getPlanProducts '+subId);
    return this.http.get(rootPath+'/planproducts/'+subId);
  }

  getPlanDetails(subId){
    
    console.log('getPlanProducts '+subId);
    return this.http.get(rootPath+'/plandetails/'+subId);
  }
  
  createSub(planFreID,customerID){

    const subscriptionBody = { "CustomerID": customerID , "planFrequencyID": planFreID};
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

      return this.http.post(rootPath + '/subscription/create', subscriptionBody, {
      headers: headers
    })
      .subscribe(data => {
this.status$=data;
       
alert("DDD::>"+JSON.stringify(data))
//alert("DDD::>"+this.status$.id);
//let planID= this.status$.id;
const activationBody = { "subscriptionId": 1253769 };
//const activationBody = { "subscriptionId": 12345 };
const headers = new HttpHeaders()
  .set('Authorization', 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN')
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  return this.http.post(rootPath + '/subscription/activate', activationBody, {
  headers: headers
})
  .subscribe(data => {
this.status$=data;
   
alert("DDD::>"+JSON.stringify(data))

   

  });

      });

  }

}
