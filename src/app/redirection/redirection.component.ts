import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    alert(sessionStorage.getItem("redirectPage"))
    if(sessionStorage.getItem("redirectPage")=='home'){
      window.location.href = window.location.origin+'/home'
    }else{
      window.location.href = window.location.origin+'/myCart'
      
    }

  }

}
