import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HideMenusService } from '../hide-menus.service';
import { Session } from 'protractor';
import { FilterPipe } from 'ngx-filter-pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  mysubscriptions$: Object;
  planDetails$: Object;

  autorenewal$: Object;


  items$: Object;




  users: any[] = [];
  userFilter: any = {};

  constructor(private data: DataService, public nav: HideMenusService, private spinner: NgxSpinnerService, private filterPipe: FilterPipe) { }


  ngOnInit() {
    
    this.spinner.show();
    this.nav.show();
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
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
  //Method to delete an active subscription
  cancelSubscription(subId, planname) {
    if (confirm("Are you sure to cancel " + planname + "?")) {
      this.items$ = this.data.cancelSubscription(subId).subscribe(

        data => { //this.mysubscriptions$ = data ;
          var json = JSON.parse(JSON.stringify(data));
          // this.mysubscriptions$=json.data;
          if(json.status=='canceled'){
            alert("Subscription cancelled successfully")
          }else{
            alert("Sorry!Try again")
          }
         
        },
        err => {
          console.log(err)
        }, () => {
        }
  
      );;
      // this.data.getMySubscription().subscribe(
      //   data => this.mysubscriptions$ = data
      // );
    }

  }

  autorenewalFunction(subscriptionId: String, e) {
    if (e.target.checked == true) {
      this.data.disableAutorenewal(subscriptionId);
      alert("Auto renewal is on")
    } else if (e.target.checked == false) {
      this.data.enableAutorenewal(subscriptionId);
      alert("Auto renewal is off")
    }


  }
}
