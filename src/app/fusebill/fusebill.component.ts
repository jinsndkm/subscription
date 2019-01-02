import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-fusebill',
  templateUrl: './fusebill.component.html',
  styleUrls: ['./fusebill.component.scss']
})
export class FusebillComponent implements OnInit {

  services$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getAllFusebillServices().subscribe(
      data => this.services$ = data
    );
  }

  
}
