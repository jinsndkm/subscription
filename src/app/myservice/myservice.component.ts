import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myservice',
  templateUrl: './myservice.component.html',
  styleUrls: ['./myservice.component.scss']
})
export class MyserviceComponent implements OnInit {
  userName: String;
  constructor() { }

  ngOnInit() {
    this.userName=localStorage.getItem("userName");
  }

}
