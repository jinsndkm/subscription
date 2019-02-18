import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HideMenusService } from '../hide-menus.service';

@Component({
  selector: 'app-view-subscription-details',
  templateUrl: './view-subscription-details.component.html',
  styleUrls: ['./view-subscription-details.component.scss']
})
export class ViewSubscriptionDetailsComponent implements OnInit {

  mySubscrriptionDetails$: Object

  constructor(private route: ActivatedRoute, private data: DataService,public nav: HideMenusService) { }



  ngOnInit() {
    this.nav.show();
    var subId;
    this.route.queryParams.subscribe(params => {
      alert(params.subId.id)
      subId = params.subId;
      
    })
    this.data.viewSubscriptionDetails(subId).subscribe(
      data => {this.mySubscrriptionDetails$ = data;
        this.mySubscrriptionDetails$ = Array.of(this.mySubscrriptionDetails$); 
      }
    );
  }
}

