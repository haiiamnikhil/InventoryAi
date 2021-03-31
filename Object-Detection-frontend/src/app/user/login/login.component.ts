import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string
  password:string
  message:any = []
  isBusy:boolean = false

  constructor(private userAuthService: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(){
    this.userAuthService.currentmessage.subscribe(message => {if (message){
      this.toastr.success(message);
    }})
  }

  authUser(){
    let auth = {
      username:this.username,
      password:this.password
    }
    this.isBusy = true;
    this.userAuthService.login(auth).subscribe(
      response => {
        if (response.status){
          
          this.router.navigate(['/'])
        }
        else {
          this.isBusy = false;
          this.toastr.warning("Entered Credentials is Not Valid")
        }
      },
      error=>{
        console.log(error)
      }
    )
  }
}
