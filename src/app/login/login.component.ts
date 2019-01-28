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
  constructor(public nav: HideMenusService,private router: Router,private data: DataService) { }
  userName: string = '';
  password:string='';
  cardDetails$:Object;
  ngOnInit() {
    this.nav.hide();
    sessionStorage.removeItem('cartList');

  }

  
  validateLogin() {
    if(this.userName=='admin'&&this.password=='admin'){
      this.cardDetails$=this.data.checkCardDetails(4870443).subscribe(
        data => {this.cardDetails$ = data}
        ,
        err => {
          console.log(err)
        }, () => {
          if(JSON.stringify(this.cardDetails$).length>2){
           sessionStorage.setItem("isCardAdded","true");
          }else{
            sessionStorage.setItem("isCardAdded","false");
          }
        }
      );
      sessionStorage.setItem("userName","Marry");
         this.router.navigate(['home']);
    }else{
    alert("Invalid username or Password")}
  }
}
