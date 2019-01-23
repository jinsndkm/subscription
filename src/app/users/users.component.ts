import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
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

  constructor(private data: DataService) { }

  ngOnInit() {
    localStorage.setItem("Plans",this.plans);
  }

}
