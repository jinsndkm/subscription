import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  mysubscriptions$ : Object;

  constructor(private data:DataService) { }

  ngOnInit() {

    this.data.getMySubscription().subscribe(
      data => this.mysubscriptions$=data
    );
  }
  cancelSubscription(subId) {
    if(confirm("Are you sure to cancel?")) {
      let resu=this.data.cancelSubscription(subId);
      
      alert("FINAL::>"+JSON.stringify(resu.toString()));
      this.data.getMySubscription().subscribe(
        data => this.mysubscriptions$=data
      );
    }
  
  }

}
