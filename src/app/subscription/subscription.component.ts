import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }
  cancelSubscription(subId) {
    
    this.data.cancelSubscription(subId);
  }

}
