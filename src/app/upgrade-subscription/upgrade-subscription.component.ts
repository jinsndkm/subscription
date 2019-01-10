import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-upgrade-subscription',
  templateUrl: './upgrade-subscription.component.html',
  styleUrls: ['./upgrade-subscription.component.scss']
})
export class UpgradeSubscriptionComponent implements OnInit {
  upgradeSubscriptions: Object;
  items: any[];
  subId:string;
  constructor(private data: DataService,private route: ActivatedRoute) { }

  createRange(number){
    this.items = [];
    for(var i = 1; i <= number; i++){
       this.items.push(i);
    }
    return this.items;
  }


  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.subId = params.subId;
    })
    this.data.listUpgradeSubscriptions(this.subId).subscribe(
      data => this.upgradeSubscriptions = data
    );
  }

  migratePlan(plansFamilyRltnId,subId){
    alert(this.subId)
    this.data.migrateSubsctiption(plansFamilyRltnId,this.subId);
    alert("SUBID:::>"+this.subId)
    alert("Migrating..."+plansFamilyRltnId)
  }
}
