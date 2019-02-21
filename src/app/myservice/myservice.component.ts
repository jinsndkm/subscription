import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { from } from 'rxjs';
import { HideMenusService } from '../hide-menus.service';
import { enableProdMode } from '@angular/core';
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
  finalServicesList$: any[] = [];
  mysubscriptions$: Object;
  serviceList: any = [];
  serviceStatus: boolean = false;
  private modals: any[] = [];
  plans: any = [];
  constructor(private data: DataService, public nav: HideMenusService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.nav.show();
    this.data.getAllFusebillServices().subscribe(
      data => {
        var serviceJson = JSON.parse(JSON.stringify(data));
        this.servicesList$ = serviceJson.data;


        this.data.getMySubscription().subscribe(

          data => { 
            var json = JSON.parse(JSON.stringify(data));
            this.mysubscriptions$ = json.data;
            // Checking service is already subscribed or not
            for (var i = 0; i < serviceJson.data.length; i++) {
              var status = 0;
              for (var j = 0; j < json.data.length; j++) {
                if (serviceJson.data[i].id == json.data[j].items.data[0].plan.product) {
                  status = 1;
                }

              }
              if (status == 0) {
                this.finalServicesList$.push(this.servicesList$[i]);
              }
            }
            ////////////////////////////////////////////////
          },
          err => {
            console.log(err)
          }, () => {
          }

        );
      },
      err => {
        console.log(err)
      }, () => {
        this.spinner.hide();
      }

    );
    userName: String;

  }
}
