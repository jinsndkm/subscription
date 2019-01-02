import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user$ : Object;

  constructor(private route: ActivatedRoute,private data:DataService) {
    this.route.params.subscribe( params => this.user$ = params.id );
   }

  ngOnInit() {

    this.data.getUser(this.user$).subscribe(data => this.user$ = data);

  }

}
