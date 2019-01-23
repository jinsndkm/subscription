import { Component, OnInit } from '@angular/core';
import { HideMenusService } from '../hide-menus.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( public nav: HideMenusService ) { }

  ngOnInit() {
 
  }

}
