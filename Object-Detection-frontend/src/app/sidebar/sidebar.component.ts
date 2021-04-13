import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() name = new EventEmitter();
  viewMode:boolean = false;

  constructor(public router : Router) { }

  ngOnInit(): void {
  }

  

}
