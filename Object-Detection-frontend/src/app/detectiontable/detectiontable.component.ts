import { Store } from '@ngrx/store';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detectiontable',
  templateUrl: './detectiontable.component.html',
  styleUrls: ['./detectiontable.component.css']
})
export class DetectiontableComponent implements OnInit {
  
  singleDetectionHistory:any = []
  multiDetectionBatch:any = []
  multiDetectionFiles:any=[]
  singleDetectionfilesLength:number
  multiDetectionfilesLength:number
  singleDetectionPage: number = 1
  multiDetectionPage: number = 1
  perPageItem:number = 10
  viewMode:string
  isDisplay:boolean = false
  getElements:any

  multiSelectedId:any = []
  zipFile:any

  constructor(private apiService: ApiService, private elref: ElementRef, private store: Store<{message: {category:string}}>) { }

  ngOnInit(){
    this.store.select('message').subscribe(mode => this.viewMode = mode.category)
    console.log(this.viewMode)
    this.apiService.detectionHistory().subscribe(response =>{
      if (response.status){
        
        console.log(this.multiDetectionFiles)
        this.singleDetectionHistory.push(response.singleDetection)
        this.multiDetectionBatch.push(response.batchProcessing)
        // this.multiDetectionFiles.push(response.batchFiles)

        this.singleDetectionfilesLength = this.singleDetectionHistory[0].length
        // this.multiDetectionfilesLength = this.multiDetectionBatch[0].length

      }
    },err => console.log(err))  
  }

  showChild(event:any,id:any){
    this.multiDetectionFiles = []
 
    let data = {processId:id}

    this.getElements = event.currentTarget.parentNode.parentNode.nextSibling
    this.apiService.getBatchFiles(data).subscribe(response => {
      if (response.status){
        this.multiDetectionFiles.push(response.batchFiles)

        let element = this.elref.nativeElement.querySelectorAll('.batch_file_child')

        if (this.getElements.style.display == 'block'){
          this.getElements.style.display = 'none'
        }
        else{
          this.getElements.style.display = 'block'
        }
        for (let i = 0; i < element.length; i++){
          if (element[i] != this.getElements){
            element[i].style.display = 'none'
          }
        }

      }  
    })

  }

  boxSelected(event:any) {
    let isChecked = event.srcElement.checked
    let parentElement = event.target.parentElement
    let checkedId = event.target.value

    if (isChecked){
      parentElement.classList.add("activeClass")
      this.multiSelectedId.push(checkedId)
    } 
    
    else {
      parentElement.classList.remove("activeClass")
      const index = this.multiSelectedId.indexOf(checkedId)
      this.multiSelectedId.splice(index,1)
    }
  }

  generateCSV(){
    let data = {
      batchId : this.multiSelectedId
    }

    this.apiService.generateCSV(data).subscribe(response => {
      if (response.status){
        window.location = response.data
        // this.zipFile = response.data
      }
    },err=> console.log(err))
  }

}
