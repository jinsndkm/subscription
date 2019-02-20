import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { from } from 'rxjs';
import { HideMenusService } from '../hide-menus.service';
import {enableProdMode} from '@angular/core';
import * as $ from "jquery";
import * as _ from "lodash"
import { NgxSpinnerService } from 'ngx-spinner';

enableProdMode();

@Component({
  selector: 'app-myservice',
  templateUrl: './myservice.component.html',
  styleUrls: ['./myservice.component.scss']
})
export class MyserviceComponent implements OnInit {

  servicesList$: Object;
  mysubscriptions$: Object;

  private modals: any[] = [];
plans:any = [];
  constructor(private data: DataService, public nav: HideMenusService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    //this.nav.show();
    //sessionStorage.setItem("Plans",this.plans);
    this.data.getAllFusebillServices().subscribe(
      //data => this.servicesList$ = data
      data => {
      var json=JSON.parse(JSON.stringify(data));
      this.servicesList$=json.data;
      },
      err => {
        console.log(err)
      }, () => {
        this.spinner.hide();
      }
      
    );

    this.data.getMySubscription().subscribe(

      data => { //this.mysubscriptions$ = data ;
        var json = JSON.parse(JSON.stringify(data));
        this.mysubscriptions$=json.data;
        
      },
      err => {
        console.log(err)
      }, () => {
      }

    );


    


  userName: String;

}
}
