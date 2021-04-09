import { ToastrService } from 'ngx-toastr';
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

  constructor(private service: ApiService, private store: Store<{message:{category:string}}>, private toastr: ToastrService) { }

  ngOnInit(){
    this.toastr.clear()
    this.store.select('message').subscribe(message=>this.selectedCategory = message.category)
    this.toastr.success(this.selectedCategory)
  }

  presentMode(){
    this.toastr.clear()
    if (this.selectedCategory == 'single'){
      this.store.dispatch(single())
      this.toastr.success(this.selectedCategory)
    }
    else{
      this.store.dispatch(multiple())
      this.toastr.success(this.selectedCategory)
    }
  }
}
