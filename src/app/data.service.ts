import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
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

    return this.http.get(rootPath + '/fusebill');

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
      });

  }

  getMySubscription() {
    console.log('getMySubscription');
    return this.http.get(rootPath + '/mysubscriprions');
  }

  listUpgradeSubscriptions(subscriptionId) {
    return this.http.get(rootPath + '/subscription/listupgradesubscriptions/' + subscriptionId);
  }

  migrateSubsctiption(plansFamilyRltnId,subId) {
    const migrationBody = {
      "customerId": "4871251",
      "planFamilyRelationshipId": plansFamilyRltnId,
      "migrationTimingOption": "Now",
      "subId":subId
    };
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post(rootPath + '/subscription/migratesubscription/', migrationBody, {
      headers: headers
    })
      .subscribe(data => {
    
      });
  }

}
