import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { from } from 'rxjs';
import { HideMenusService } from '../hide-menus.service';
import {enableProdMode} from '@angular/core';
import * as $ from "jquery";
import * as _ from "lodash"

enableProdMode();

@Component({
  selector: 'app-myservice',
  templateUrl: './myservice.component.html',
  styleUrls: ['./myservice.component.scss']
})
export class MyserviceComponent implements OnInit {

  servicesList$: Object;

  private modals: any[] = [];
plans:any = [];
  constructor(private data: DataService, public nav: HideMenusService) { }

  ngOnInit() {
    this.nav.show();
    sessionStorage.setItem("Plans",this.plans);
    this.data.getAllFusebillServices().subscribe(
      data => this.servicesList$ = data
    );
    //alert();

  userName: String;

}
}
