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
  
  constructor(private apiService:ApiService) { }

  ngOnInit(){
  }

  onChange(event:any){
    this.files = event.target.files[0]
    console.log(this.files)
  }

  onSubmit(){
    let data = new FormData();
    data.append("name",this.files.name)
    data.append("image",this.files,this.files.name)
    data.append('class',this.class)
    this.apiService.userApiView(data).subscribe(response =>console.log(response),err=> console.log(err))
  }

}
