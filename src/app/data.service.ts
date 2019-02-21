import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router"

import { Alert } from '../../node_modules/@types/selenium-webdriver';
import * as _ from "lodash"
import { Globals } from './globals/global';
import { NgxSpinnerService } from 'ngx-spinner';
import { isUndefined } from 'util';


// import { stat } from 'fs';
var querystring = require('querystring');

var rootPath = "http://localhost:2000";


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

  cardBody$: Object;

  cardDetails$: Object;

  private custId: String;

  productDetails$: Object;

  invoiceBody$: Object;

  cartItems: Array<any> = [];
  constructor(private http: HttpClient, private router: Router, private global: Globals, private spinner: NgxSpinnerService) {
    this.custId = global.CUSTOMER_ID;

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

    // let statusCode;
    // const subscriptionBody = { "subscriptionId": subscriptionId, "cancellationOption": "None" };
    // const headers = new HttpHeaders()
    //   .set('Authorization', 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN')
    //   .set('Content-Type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*');

    // return this.http.post(rootPath + '/subscription/cancel', subscriptionBody, {
    //   headers: headers
    // })
    //   .subscribe(data => {
    //     data => statusCode = data
    //     var json = JSON.parse(JSON.stringify(data));
    //     if (json.HttpStatusCode == 400) {
    //       alert("Something Went wrong! Please try again")
    //     } else {
    //       alert("Subscription cancelled successfully")
    //       window.location.reload();
    //     }
    //   });

    // let statusCode;
    // // const subscriptionBody = { "subscriptionId": subscriptionId, "cancellationOption": "None" };
    // // const headers = new HttpHeaders()
    // //   .set('Authorization', 'Basic MDpEZk9jcExWQVFFczk1U1hPSWhER0J0RzFXOFJCaGs3UVFsU2xOQ0JJRUJ4Y1NSSG9JQXAzbTJVdGFWNVRZUlVN')
    // //   .set('Content-Type', 'application/json')
    // //   .set('Access-Control-Allow-Origin', '*');

    // return this.http.delete(rootPath + '/subscription/cancel', {

    // })
    //   .subscribe(data => {
    //     data => statusCode = data
    //     var json = JSON.parse(JSON.stringify(data));
    //     if (json.HttpStatusCode == 400) {
    //       alert("Something Went wrong! Please try again")
    //     } else {
    //       alert("Subscription cancelled successfully")
    //     }
    //   });
    // return this.http.get(rootPath + '/subscription/cancel/' + subscriptionId);
    return this.http.get(rootPath + '/subscription/cancel/' + subscriptionId);

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
          this.router.navigate(['home/mysubscription']);
          // return planBody;

        } else {
          alert("Plan upgraded successfully")
          this.router.navigate(['home/mysubscription']);
          //return planBody;
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
  getProductDetails(subId) {

    console.log('getPlanProducts ' + subId);
    return this.http.get(rootPath + '/productdetails/' + subId);
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
      },
        err => {
          console.log(err)

        },() => {
          var json = JSON.parse(JSON.stringify(this.status$));
         


        }, () => {

        //   alert("inside get plan details ::>> " + sessionStorage.getItem("product_id"));

        //   this.http.get(rootPath + '/getplandetails/' + sessionStorage.getItem("product_id")).subscribe(data => {
        //     this.productDetails$ = data;
        //   }, err => {
        //     console.log(err)
        //   }, () => {
        //     alert();
        //     var json = JSON.parse(JSON.stringify(this.productDetails$));
        //     var setupCharge = json.metadata.setup;
        //     alert(setupCharge)
        //     if (setupCharge > 0) {
        //       const createInvoiceBody = { "customer": customerID, "amount": setupCharge };
        //       const headers = new HttpHeaders()
        //         .set('Authorization', 'Basic MDpRU2tCZlRkVGVVVGVYWTRyNllmZEhITlRKMEhmWHphdXZ5cEFmNFpYOEMwTnEwUm5sZHRlRXpWS2ttU3Z2dVdH')
        //         .set('Content-Type', 'application/json')
        //         .set('Access-Control-Allow-Origin', '*');

        //       return this.http.post(rootPath + '/createInvoice', createInvoiceBody, {
        //         headers: headers
        //       })
        //         .subscribe(data => {
        //           this.invoiceBody$ = data;
                  
        //         },err=>{
        //           console.log(err)
        //         },()=>{
        //           var json = JSON.parse(JSON.stringify(this.invoiceBody$));
        //           console.log("Invoice body ::>> " + json);
        //           var invoiceID = json.id;
        //         })
        //     }
        // });


        },() => {
          var json = JSON.parse(JSON.stringify(this.status$));
         


          this.spinner.hide();
          if(json.statusCode == 200){

             this.http.get(rootPath + '/writetocsv/' + this.custId).subscribe(data => {
              this.status$ = data;
              var json = JSON.parse(JSON.stringify(this.status$));
            },
              err => {
                console.log(err)
              },() => {
                this.router.navigate(['SuccessMessage']);
                
              });
            
          }
          
        });
  }


  enableAutorenewal(subscriptionId) {


    var querystring = require('querystring');

    // form data
    var postData = querystring.stringify({
      "subscriptionId": subscriptionId
    });
    //const activationBody = { "subscriptionId": 12345 };
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer sk_live_WcIoDcfVidYWkaNoELBX2NIX')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post(rootPath + '/mysubscription/autorenewal/disable', postData, {
      headers: headers
    })
      .subscribe(data => {
        this.status$ = data
        var json = JSON.parse(JSON.stringify(this.status$))
      },
        err => {
          console.log(err)
        }, () => {
          this.router.navigate(['SuccessMessage']);
        }
      );

  }

  disableAutorenewal(subscriptionId) {
    var querystring = require('querystring');

    // form data
    var postData = querystring.stringify({
      "subscriptionId": subscriptionId
    });
    //const activationBody = { "subscriptionId": 12345 };
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer sk_live_WcIoDcfVidYWkaNoELBX2NIX')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post(rootPath + '/mysubscription/autorenewal/', postData, {
      headers: headers
    })
      .subscribe(data => {
        this.status$ = data
        var json = JSON.parse(JSON.stringify(this.status$))
      },
        err => {
          console.log(err)
        }, () => {
          this.router.navigate(['SuccessMessage']);
        }
      );



  }


  checkCardDetails(custId) {
    console.log('CustomerID ' + custId);
    return this.http.get(rootPath + '/checkcarddetails/' + custId);
  }

  getMySubscriptionPlanDetails() {
    return this.http.get(rootPath + '/checkcarddetails/');
  }

  getSingleSignOnKey(custId) {
    return this.http.get(rootPath + '/getsignlesignonkey/' + custId);
  }
  addCardDetails(token) {



    // form data
    var cardDetailsBody = querystring.stringify({
      "CustomerID": this.custId, "token": token
    });

    //const cardDetailsBody = { "CustomerID": this.custId, "token": token };
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer sk_test_7r4dL5ykom8nvTTA93cVLcve')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Origin', '*');


    return this.http.post(rootPath + '/addnewcardtostripe', cardDetailsBody, {
      headers: headers
    })
      .subscribe(data => {
        // this.cardDetails$ = data;
        var json = JSON.parse(JSON.stringify(data));

        this.cardDetails$ = json;

        //var json = JSON.parse(JSON.stringify(this.cardDetails$));
      },
        err => {
          console.log(err)
        }, () => {

          var json = JSON.parse(JSON.stringify(this.cardDetails$));
          var defaultCardBody = querystring.stringify({
            "customer": this.custId, "card": json.id
          });

          //const cardDetailsBody = { "CustomerID": this.custId, "token": token };
          const headers = new HttpHeaders()
            .set('Authorization', 'Bearer sk_test_7r4dL5ykom8nvTTA93cVLcve')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Access-Control-Allow-Origin', '*');

          return this.http.post(rootPath + '/addservice/carddetails/makedefault', defaultCardBody, {
            headers: headers
          })
            .subscribe(data => {
              this.cardDetails$ = data;
            },
              err => {
                console.log(err)
              }, () => {
                const planID = sessionStorage.getItem("planDetailsID");
                alert(planID);

                this.cardDetails$ = this.checkCardDetails(this.custId).subscribe(
                  data => {
                    var json = JSON.parse(JSON.stringify(data));
                    this.cardDetails$ = json.data;
                  }

                  ,
                  err => {
                    console.log(err)
                  }, () => {
                    var json = JSON.parse(JSON.stringify(this.cardDetails$));
                    if (json.length > 0) {
                      // for (let i = 0; i < json.length; i++) {
                      // if (json[i].isDefault == true) {

                      sessionStorage.setItem("cardNumner", json[0].last4);
                      // } 
                      //}

                      sessionStorage.setItem("isCardAdded", "true");
                    } else {
                      sessionStorage.setItem("isCardAdded", "false");
                    }
                  }
                );

                if (planID == "undefined") {
                  // CART MANAGEMENT
                  this.cartItems = JSON.parse(sessionStorage.getItem('cartList'));
                  this.cartItems.forEach(element => {
                    var status = this.createSub(element.selectedFreId, this.custId);
                  });
                  sessionStorage.removeItem('cartList');
                  // CART MANAGEMENT
                } else {
                  var resp = this.createSub(planID, this.custId);
                  sessionStorage.removeItem('planDetailsID');
                }
                // var json = JSON.parse(JSON.stringify(this.cardDetails$));
              })



        });

  }


  addNewCard(token) {



    // form data
    var cardDetailsBody = querystring.stringify({
      "CustomerID": this.custId, "token": token
    });

    //const cardDetailsBody = { "CustomerID": this.custId, "token": token };
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer sk_test_7r4dL5ykom8nvTTA93cVLcve')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Origin', '*');


    return this.http.post(rootPath + '/addnewcardtostripe', cardDetailsBody, {
      headers: headers
    })
      .subscribe(data => {
        // this.cardDetails$ = data;
        var json = JSON.parse(JSON.stringify(data));

        this.cardDetails$ = json;

        //var json = JSON.parse(JSON.stringify(this.cardDetails$));
      },
        err => {
          console.log(err)
        }, () => {

          var json = JSON.parse(JSON.stringify(this.cardDetails$));
          var defaultCardBody = querystring.stringify({
            "customer": this.custId, "card": json.id
          });

          //const cardDetailsBody = { "CustomerID": this.custId, "token": token };
          const headers = new HttpHeaders()
            .set('Authorization', 'Bearer sk_test_7r4dL5ykom8nvTTA93cVLcve')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Access-Control-Allow-Origin', '*');

          return this.http.post(rootPath + '/addservice/carddetails/makedefault', defaultCardBody, {
            headers: headers
          })
            .subscribe(data => {
              this.cardDetails$ = data;
            },
              err => {
                console.log(err)
              }, () => {
                this.spinner.hide();
                window.location.href = "home/managecards";
              })



        });

  }

  getSavedCardDetails(custId) {
    return this.http.get(rootPath + '/checkcarddetails/' + custId);
  }
  deleteCard(cardID) {

    return this.http.delete(rootPath + '/deletecard/' + cardID);
  }


}
