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

  constructor(private userPlan: ApiService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
  }

  purchase(category:any){
    this.toastr.clear();
    let values = {
      package : category
    }
    this.userPlan.userPlan(values).subscribe(response =>{
      if (response.status){
        this.router.navigate(['/payment'])
      }
      else{
        this.toastr.error('You are Alredy subscribed to the '+category + 'plan')
      }
    }, err=> console.log(err))
  }

}
