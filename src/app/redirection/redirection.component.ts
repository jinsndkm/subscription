import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HideMenusService } from '../hide-menus.service';

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent implements OnInit {
  cardDetails$: Object;

  constructor( private data: DataService,public nav: HideMenusService) { }

  ngOnInit() {
    this.nav.show();
//Card Details geting..///////////////////////////
    this.cardDetails$ = this.data.checkCardDetails(4871251).subscribe(
      data => { this.cardDetails$ = data }

      ,
      err => {
        console.log(err)
      }, () => {
        var json = JSON.parse(JSON.stringify(this.cardDetails$));

        if (json.length > 0) {
          for (let i = 0; i < json.length; i++) {
            if (json[i].isDefault == true) {
              sessionStorage.setItem("cardNumner",json[i].maskedCardNumber);
            } 
          }

          sessionStorage.setItem("isCardAdded", "false");
        } else {
          sessionStorage.setItem("isCardAdded", "false");
        }
      }
    );

    //Card Details getting /////////////////////////////////
    
    window.location.href =sessionStorage.getItem("redirectPage");

    

  }

}
