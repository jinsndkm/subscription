import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  mysubscriptions$: Object;
  items$:Object;
 
  constructor(private data: DataService,private router: Router) { }

  ngOnInit() {

    this.data.getMySubscription().subscribe(
      data => this.mysubscriptions$ = data
    );
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
