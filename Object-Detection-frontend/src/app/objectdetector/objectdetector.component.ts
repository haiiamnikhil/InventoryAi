import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-objectdetector',
  templateUrl: './objectdetector.component.html',
  styleUrls: ['./objectdetector.component.css']
})
export class ObjectdetectorComponent implements OnInit {

  viewMode: string
  files: any = []
  progress: any = 0
  count: number
  image: any
  processFiles: any = []
  detectType: string = 'Choose...'
  filename: string = "Choose..."
  getdata: any
  message: string
  showMessage: boolean
  isBusy: boolean = false
  presentViewMode:string

  constructor(private api: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.api.currentmessage.subscribe(message => {
      if(message == 'single'){
        this.files = []
        this.viewMode = message
      }
      else if(message == 'multiple'){
        this.files = []
        this.viewMode = message
      }
      else return
    },)
  }


  getDropedFiles(event: any) {
    if (this.viewMode == 'single') {
      this.files = []
      for (let i = 0; i < 1; i++) {
        this.processFiles.push(event[i])
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.files.push(e.target.result)[i]
        }
        reader.readAsDataURL(event[i])
      }
      this.toastr.warning("Only 1 image is allowed in Single Image Processing")
      this.showMessage = true
    }
    else {
      this.files = []
      for (let i = 0; i < event.length; i++) {
        this.processFiles.push(event[i])
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.files.push(e.target.result)
        }
        reader.readAsDataURL(event[i])
      }
    }
  }

  getImage(event: any) {
    let images = event.target.files
    console.log(event)
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        this.processFiles.push(images[i])
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.files.push(e.target.result)
        }
        reader.readAsDataURL(images[i])
      }
    }
  }
  
  uploadData() {
    this.isBusy= true;
    const uploadData = new FormData();
    for (let i = 0; i < this.processFiles.length; i++){
      console.log(this.processFiles[i].name)
      uploadData.append('filename', this.processFiles[i].name)
      uploadData.append('image', this.processFiles[i], this.processFiles[i].name)
      uploadData.append('detectType', this.detectType)
    }
    if (this.viewMode == 'single'){
      this.api.getsingleDetection(uploadData).subscribe(response => {
        if (response.status) {
          this.isBusy = false
          this.getdata = response.data
          this.count = response.count
        }
      },
        error => console.log(error)
      )
    }
    else if(this.viewMode == 'multiple'){
      this.api.getMultiDetection(uploadData).subscribe(response => {
        if (response.status) {
          this.isBusy = false
          this.getdata = response.data
          this.count = response.count
        }
        else{
          this.toastr.error(response.message)
          this.showMessage = true
          this.isBusy = false
        }
      },error => console.log(error)
      )
    }
  }

}
