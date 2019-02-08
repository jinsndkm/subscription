import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HideMenusService } from '../hide-menus.service';
import { from } from 'rxjs';

import {enableProdMode} from '@angular/core';

enableProdMode();

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  plans:any = [];
  services$: Object;
  users$ : Object;
 
  userName:String;
  constructor(private data: DataService,public nav: HideMenusService) { }

  ngOnInit() {
    sessionStorage.setItem("redirectPage","home");
    this.userName= sessionStorage.getItem("userName");
    this.nav.show();
    this.data.getUsers().subscribe(
      data => this.users$ = data
    );


  }

}
