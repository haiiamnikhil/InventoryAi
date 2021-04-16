import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-userapiview',
  templateUrl: './userapiview.component.html',
  styleUrls: ['./userapiview.component.css']
})
export class UserapiviewComponent implements OnInit {

  files: File
  class:string = 'Choose...'
  showImage:any = []
  detectedImages:any = []
  isBusy:boolean = false
  
  constructor(private apiService:ApiService) { }

  ngOnInit(){
    console.log(this.showImage.length)
  }

  onChange(event:any){
    let image = event.target.files
    this.isBusy = true
    for (let i = 0; i < 1; i++){
      this.files = event.target.files[i]
      let reader = new FileReader()
      reader.onload = (e:any) => {
        this.showImage.push(e.target.result)
      }
      reader.readAsDataURL(image[i])  
    }
    let data = new FormData();
    data.append("name",this.files.name)
    data.append("image",this.files,this.files.name)
    data.append('class',this.class)
    this.apiService.userApiView(data).subscribe(response =>
      {
        if (response.status){
          this.isBusy = false
          this.detectedImages.push(response.data.detectedFile)
        }
      }
      ,err=> console.log(err))
  }

  onSubmit(){
    let data = new FormData();
    data.append("name",this.files.name)
    data.append("image",this.files,this.files.name)
    data.append('class',this.class)
    this.apiService.userApiView(data).subscribe(response =>console.log(response),err=> console.log(err))
  }

}
