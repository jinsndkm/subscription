import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { from } from 'rxjs';

import {enableProdMode} from '@angular/core';
import * as $ from "jquery";
enableProdMode();

@Component({
  selector: 'app-myservice',
  templateUrl: './myservice.component.html',
  styleUrls: ['./myservice.component.scss']
})
export class MyserviceComponent implements OnInit {

  servicesList$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllFusebillServices().subscribe(
      data => this.servicesList$ = data
    );
  }



}
