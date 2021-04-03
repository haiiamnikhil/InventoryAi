import { ToastrService } from 'ngx-toastr';
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
  first_name:any
  last_name:string
  confirmpassword:string
  organisation_name:string
  plan:string = "Choose Plan"
  message:string
  isBusy:boolean = false
  viewMode:string = 'basic'
  isValid:boolean = false

  constructor(private router:Router, private apiservice:ApiService, private toastr:ToastrService) { }

  ngOnInit(): void {
    
  }

  checkInputs(){
    if (this.username && this.password && this.email && this.plan && this.organisation_name && this.first_name && this.last_name){
      console.log(this.username , this.password , this.email , this.plan , this.organisation_name , this.first_name , this.last_name)
      this.isValid = true
    }
    this.isValid
  }

  registerUser(){
    this.checkInputs()
    if (this.isValid){
      console.log(this.isValid)
      if (this.password == this.confirmpassword){
        this.isBusy = true;
        let credentials = {
          username: this.username,
          password: this.password,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          organisation_name:this.organisation_name,
          plan:this.plan.split(' ')[0],
        }
        this.apiservice.register(credentials).subscribe(response => {
          if(response.status){
            this.apiservice.setNotification("Please Confirm your Account from " + this.email)
            this.router.navigate(['/login'])
          }
          else{
            this.isBusy = false;
            this.isValid = false
            this.toastr.error(response.message)
          }
        },
        error=> console.log(error)
        )
      }
      else{
        this.toastr.error("Entered Passwords Does Not Match")
      }
    }
    else{
      this.toastr.error('All Fields are important')
    }
  }
}
