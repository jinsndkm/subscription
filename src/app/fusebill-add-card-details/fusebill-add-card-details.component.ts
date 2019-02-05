import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router'

@Component({
  selector: 'app-fusebill-add-card-details',
  templateUrl: './fusebill-add-card-details.component.html',
  styleUrls: ['./fusebill-add-card-details.component.scss']
})
export class FusebillAddCardDetailsComponent implements OnInit {

  key$: Object;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {

    this.data.getSingleSignOnKey("4871251").subscribe(

      data => { this.key$ = data },
      err => {
        console.log(err)
      }, () => {
        window.location.href = 'https://solutions.mybillsystem.com/ManagedPortal/PaymentMethod?token=' + this.key$;
      }

    );
  }

}
