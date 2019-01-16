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

  users$ : Object;

  constructor(private data: DataService,public nav: HideMenusService) { }

  ngOnInit() {
    this.nav.show();
    this.data.getUsers().subscribe(
      data => this.users$ = data
    );
  }

}
