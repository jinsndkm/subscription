import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //window.location.href = 'http://localhost:4200/home';
  }

}
