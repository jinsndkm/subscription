import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fusebill-add-card-details',
  templateUrl: './fusebill-add-card-details.component.html',
  styleUrls: ['./fusebill-add-card-details.component.scss']
})
export class FusebillAddCardDetailsComponent implements OnInit {

  key$: Object;

  constructor(private data: DataService, private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.data.getSingleSignOnKey("4949161").subscribe(

      data => { this.key$ = data },
      err => {
        console.log(err)
      }, () => {
        window.location.href = 'https://solutions.mybillsystem.com/ManagedPortal/PaymentMethod?token=' + this.key$;
      }

    );
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3500);
  }

}