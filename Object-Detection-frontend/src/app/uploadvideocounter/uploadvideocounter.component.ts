import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-uploadvideocounter',
  templateUrl: './uploadvideocounter.component.html',
  styleUrls: ['./uploadvideocounter.component.css']
})
export class UploadvideocounterComponent implements OnInit {

  videoFile:any = [];
  class:string = 'Person';
  url:any;
  isBusy:boolean;

  constructor(private apiservices: ApiService) { }

  ngOnInit(): void {
  }

  onChange(event:any){
    this.isBusy = true
    let fileUploaded = event.target.files
    this.videoFile.push(event.target.files[0])
    if (fileUploaded.length > 0){
      this.isBusy =false
      let fileReader = new FileReader();
      fileReader.readAsDataURL(fileUploaded[0])
      fileReader.onload = (event) => {
        this.url = event.target.result
      }
    }
  }

  uploadData(){
    this.isBusy = true
    const data = new FormData();
    data.append("file", this.videoFile[0])
    data.append('filename',this.videoFile[0].name)
    data.append('class', this.class)
    this.apiservices.videoUpload(data).subscribe(response => 
      {if (response.status){
        this.isBusy = false
      }},err => console.log(err))
  }

}
