import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-upgrade-subscription',
  templateUrl: './upgrade-subscription.component.html',
  styleUrls: ['./upgrade-subscription.component.scss']
})
export class UpgradeSubscriptionComponent implements OnInit {
  upgradeSubscriptions$: Object;

  constructor(private data: DataService,private route: ActivatedRoute) { }

  ngOnInit() {
    let subId;
    this.route.queryParams.subscribe(params => {
      subId = params.subId;
    })
    this.data.listUpgradeSubscriptions(subId).subscribe(
      data => this.upgradeSubscriptions$ = data
    
    );

    alert(this.upgradeSubscriptions$);
  }

}
