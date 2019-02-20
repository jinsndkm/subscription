import { Component, OnInit } from '@angular/core';
import * as _ from "lodash"
import { Globals } from '../globals/global';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { HideMenusService } from '../hide-menus.service';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-manage-cards',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.scss']
})
export class ManageCardsComponent implements OnInit {
  private custId:String;
  savedCardDetails$: Object;
  constructor(private http: HttpClient,private data: DataService, private route: ActivatedRoute,public nav: HideMenusService, private spinner: NgxSpinnerService,private global:Globals) {
    this.custId=global.CUSTOMER_ID; 
  }

  ngOnInit() {
  
    this.nav.show();
    
  //  this.spinner.show();
    this.data.getSavedCardDetails(this.custId).subscribe(
      data => {
        var json=JSON.parse(JSON.stringify(data));
        
      this.savedCardDetails$=json.data;
     
    },
      err => {
        console.log(err)
        
      }, () => {
        this.spinner.hide();
        this.nav.show();
      }

    );
  }

  deletecard(cardID){
    this.spinner.show();
    this.data.deleteCard(cardID).subscribe(
      data => {
       
        var json=JSON.parse(JSON.stringify(data));
        
     // this.savedCardDetails$=json.data;
     
    },
      err => {
        console.log(err)
        
      }, () => {
       
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

    );
  }

}
