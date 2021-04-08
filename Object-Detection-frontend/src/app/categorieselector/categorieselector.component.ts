import { NgRedux } from 'ng2-redux';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CategorySelectorState } from '../category.reducer';

@Component({
  selector: 'app-categorieselector',
  templateUrl: './categorieselector.component.html',
  styleUrls: ['./categorieselector.component.css']
})
export class CategorieselectorComponent implements OnInit {

  viewMode:string ="multi"

  constructor(private service: ApiService, private ngRedux:NgRedux<CategorySelectorState>) { }

  ngOnInit(){ 
  }

  presentMode(){
    this.ngRedux.dispatch({type: this.viewMode})
  }
}
