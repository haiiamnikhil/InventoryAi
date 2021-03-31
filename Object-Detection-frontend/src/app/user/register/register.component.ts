import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string
  password:string
  email:string
  first_name:string
  last_name:string
  confirmpassword:string
  organisation_name:string
  plan:string = "Choose Plan"
  // organisation_email:string
  // organisation_type:string
  // organisation_strength:string
  message:string
  isBusy:boolean = false
  viewMode:string = 'basic'

  constructor(private router:Router, private apiservice:ApiService) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.isBusy = true;
    let credentials = {
      username: this.username,
      password: this.password,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      organisation_name:this.organisation_name,
      plan:this.plan,
      // organisation_email:this.organisation_email,
      // organisation_type:this.organisation_type,
      // organisation_strength:this.organisation_strength
    }
    console.log(credentials)
    this.apiservice.register(credentials).subscribe(response => {
      if(response.status){
        this.apiservice.setNotification("Please Confirm your Account from " + this.email)
        this.router.navigate(['/login'])
      }
      else{
        this.isBusy = false;
        this.message = response.message
      }
    },
    error=> console.log(error)
    )
  }
}
