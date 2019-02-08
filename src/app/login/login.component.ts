import { Component, OnInit } from '@angular/core';
import { HideMenusService } from '../hide-menus.service';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public nav: HideMenusService, private router: Router, private data: DataService) { }
  userName: string = '';
  password: string = '';
  cardDetails$: Object;
  ngOnInit() {

    this.nav.hide();
    sessionStorage.removeItem('cartList');

  }


  validateLogin() {

    if (this.userName == 'admin' && this.password == 'admin') {
      this.cardDetails$ = this.data.checkCardDetails(4949161).subscribe(
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

            sessionStorage.setItem("isCardAdded", "true");
          } else {
            sessionStorage.setItem("isCardAdded", "false");
          }
        }
      );
      sessionStorage.setItem("userName", "Marry");
      this.router.navigate(['home']);
    } else {
      alert("Invalid username or Password")
    }
  }
}
