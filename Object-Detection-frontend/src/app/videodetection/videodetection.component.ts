import { Router } from '@angular/router';
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
  class:string
  isDetections: boolean = true

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(){
    if (this.router.url == '/video-detection'){
      window.location.href = '/video-detection/'
    }
  }
}
  