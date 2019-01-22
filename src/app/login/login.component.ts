import { Component, OnInit } from '@angular/core';
import { HideMenusService } from '../hide-menus.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public nav: HideMenusService,private router: Router) { }
  userName: string = '';
  password:string='';
  ngOnInit() {
    this.nav.hide();
  }

  
  validateLogin() {
    if(this.userName=='admin'&&this.password=='admin'){
      sessionStorage.setItem("userName","Marry");
         this.router.navigate(['home']);
    }else{
    alert("Invalid username or Password")}
  }
}
