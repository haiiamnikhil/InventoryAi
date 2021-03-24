import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  viewMode:string = "home"

  constructor(private router: Router, private apiService: ApiService) { }
 
  ngOnInit(): void {
    
  }

  logout(){
    this.apiService.logoutUser().subscribe(response=>
      {if(response.status){
        this.router.navigate(['/login'])
      }},error=>console.log(error)
      )
  }
}
