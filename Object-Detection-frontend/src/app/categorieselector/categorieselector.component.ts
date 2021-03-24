import { ApiService } from './../services/api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categorieselector',
  templateUrl: './categorieselector.component.html',
  styleUrls: ['./categorieselector.component.css']
})
export class CategorieselectorComponent implements OnInit {

  @Output() selectedMode = new EventEmitter<any>();

  viewMode:string ="single"

  constructor(private service: ApiService) { }

  ngOnInit(){
    this.service.changeMode(this.viewMode)
  }

  presentMode(){
    this.service.changeMode(this.viewMode)
  }
}
