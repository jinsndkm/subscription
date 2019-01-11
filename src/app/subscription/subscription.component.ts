import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  mysubscriptions$ : Object;
  autorenewal$ : Object;

  constructor(private data:DataService) { }

  ngOnInit() {

    this.data.getMySubscription().subscribe(
      data => this.mysubscriptions$=data
    );
  }
  cancelSubscription(subId) {
    if(confirm("Are you sure to cancel?")) {
      var resu=this.data.cancelSubscription(subId);
 
      alert("FINAL::>"+resu);
      this.data.getMySubscription().subscribe(
        data => this.mysubscriptions$=data
      );
    }
  
  }

  autorenewalFunction(subscriptionId: String){
    console.log("subscriptionId ::>> "+subscriptionId);
    this.data.enableDisableAutorenewal(subscriptionId).subscribe(
      data=>this.autorenewal$=data
    );
  }

}
