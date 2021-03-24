import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detectiontable',
  templateUrl: './detectiontable.component.html',
  styleUrls: ['./detectiontable.component.css']
})
export class DetectiontableComponent implements OnInit {

  singleDetectionHistory:any = []
  multiDetectionHistory:any = []
  singleDetectionfilesLength:number
  multiDetectionfilesLength:number
  page: number = 1
  perPageItem:number = 5
  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.detectionHistory().subscribe(response =>{
      if (response.status){
        this.singleDetectionHistory.push(response.singleDetection)
        this.multiDetectionHistory.push(response.multiDetection)
        this.singleDetectionfilesLength = this.singleDetectionHistory[0].length
        this.multiDetectionfilesLength = this.multiDetectionHistory[0].length
        console.log(this.singleDetectionHistory)
      }
    },err => console.log(err))
  }

}
