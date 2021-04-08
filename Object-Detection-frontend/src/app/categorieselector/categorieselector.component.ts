import { multiple, single } from './../state/category.actions';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'


@Component({
  selector: 'app-categorieselector',
  templateUrl: './categorieselector.component.html',
  styleUrls: ['./categorieselector.component.css']
})
export class CategorieselectorComponent implements OnInit {

  selectedCategory:any

  constructor(private service: ApiService, private store: Store<{message:{category:string}}>) { }

  ngOnInit(){ 
    this.store.select('message').subscribe(message=>this.selectedCategory = message.category)
  }

  presentMode(){
    if (this.selectedCategory == 'single'){
      this.store.dispatch(single())
    }
    else{
      this.store.dispatch(multiple())
    }
  }
}
