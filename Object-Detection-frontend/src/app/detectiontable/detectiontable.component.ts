import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  singleDetectionPage: number = 1
  multiDetectionPage: number = 1
  perPageItem:number = 10
  viewMode:string
  isDisplay:boolean = false

  constructor(private apiService: ApiService, private reference: ElementRef) { }

  ngOnInit(){
    this.apiService.currentmessage.subscribe(mode => this.viewMode = mode)
    this.apiService.detectionHistory().subscribe(response =>{
      if (response.status){
        this.singleDetectionHistory.push(response.singleDetection)
        this.multiDetectionHistory.push(response.multiDetection)
        this.singleDetectionfilesLength = this.singleDetectionHistory[0].length
        this.multiDetectionfilesLength = this.multiDetectionHistory[0].length
      }
    },err => console.log(err))
  }

  showChild(event:any){
    let getElements = event.currentTarget.parentNode.parentNode.nextSibling
    if (getElements.style.display == 'block'){
      getElements.style.display = 'none'
    }
    else{
      getElements.style.display = 'block'
    }
  }

}
