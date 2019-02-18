import { Component, OnInit } from '@angular/core';
import * as _ from "lodash"
import { Globals } from '../globals/global';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { HideMenusService } from '../hide-menus.service';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';

var rootPath = "http://localhost:3000";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  private custId:String;
  savedCardDetails$: Object;
  planid:String;
  status$: Object;

  cardStatus: String;

  constructor(private http: HttpClient,private data: DataService, private route: ActivatedRoute,public nav: HideMenusService, private spinner: NgxSpinnerService,private global:Globals) {
    this.custId=global.CUSTOMER_ID;
   }

  ngOnInit() {
    this.spinner.show();
    
    this.nav.show();

this.cardStatus=sessionStorage.getItem("isCardAdded");
   
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.planid = params.id;
    })
    
    this.data.getSavedCardDetails(this.custId).subscribe(
      data => {
        var json=JSON.parse(JSON.stringify(data));
        
      this.savedCardDetails$=json.data;
     
    },
      err => {
        console.log(err)
      }, () => {
        this.spinner.hide();

      }

    );
  }

  subscribe() {

    var resp = this.data.createSub(this.planid, this.custId);

  }

  makeDefault(id){
    this.spinner.show();
    const subscriptionBody = { "customer": this.custId, "card": id };
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic MDpRU2tCZlRkVGVVVGVYWTRyNllmZEhITlRKMEhmWHphdXZ5cEFmNFpYOEMwTnEwUm5sZHRlRXpWS2ttU3Z2dVdH')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.post(rootPath + '/addservice/carddetails/makedefault', subscriptionBody, {
      headers: headers
    })
      .subscribe(data => {
        this.status$ = data;
        var json = JSON.parse(JSON.stringify(this.status$));
      },
        err => {
          console.log(err)
        },() => {
         
          
        });
  }

}
