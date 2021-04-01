import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detected',
  templateUrl: './detected.component.html',
  styleUrls: ['./detected.component.css']
})
export class DetectedComponent implements OnInit {

  detectedResult:any

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.currentmessage.subscribe(message =>
      {if(message){
        this.detectedResult = message
      }
      else{
        this.detectedResult = JSON.parse(sessionStorage.getItem('files'))
        console.log(this.detectedResult)
      }
    },error => console.log(error)
      )
  }

}
