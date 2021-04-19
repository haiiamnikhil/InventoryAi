import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-videodetection',
  templateUrl: './videodetection.component.html',
  styleUrls: ['./videodetection.component.css']
})
export class VideodetectionComponent implements OnInit {
  username: string
  password: string
  ip: string
  port: string

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  startVideo(){
    this.apiService.getCameraCredentials().subscribe(response=>
      {if (response.status){
        
      }},
      err=> console.log(err)
      )
  }

}
