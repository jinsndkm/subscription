import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HideMenusService } from '../hide-menus.service';
import { Session } from 'protractor';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  mysubscriptions$: Object;
  items$:Object;
 
  constructor(private data: DataService,public nav: HideMenusService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    sessionStorage.setItem("SessionStorage","ss");
    localStorage.setItem("sessionVale","s");
    this.nav.show();
    this.data.getMySubscription().subscribe(
      data => {this.mysubscriptions$ = data},()=>{
        
      }
    );
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
  }, 2000);
  }
  //Method to delete an active subscription
  cancelSubscription(subId) {
    if (confirm("Are you sure to cancel?")) {
      this.items$ = this.data.cancelSubscription(subId);
      this.data.getMySubscription().subscribe(
        data => this.mysubscriptions$ = data
      );
    }

  }

}
