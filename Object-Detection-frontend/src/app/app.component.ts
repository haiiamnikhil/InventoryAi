import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Object-Detection-frontend';

  constructor(public router: Router, private apiService: ApiService){}

  ngOnInit(){
    this.apiService.isLoggedIn().subscribe(
      response => {
        if (response.status){
          return
        }
        else{
          this.router.navigate(['/login']);
        }
      }
    )
  }
}
