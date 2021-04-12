import { premium, professional } from './../state/payment.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  constructor(private userPlan: ApiService, private toastr: ToastrService,private router: Router, private store: Store<{userPackage:{package:string}}>) { }

  ngOnInit(): void {
  }

  purchase(category:any){
    this.toastr.clear();
    let values = {
      package : category
    }
    
    this.userPlan.userPlan(values).subscribe(response =>{
      if (response.status){
        if (category == 'premium'){
          this.store.dispatch(premium())
        } else if (category == 'professional'){
          this.store.dispatch(professional())
        }
        this.router.navigate(['/packages/payment'])
      }
      else{
        this.toastr.error('You are Alredy subscribed to the '+category + 'plan')
      }
    }, err=> console.log(err))
  }

}
