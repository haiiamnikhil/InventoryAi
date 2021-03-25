import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filecounts',
  templateUrl: './filecounts.component.html',
  styleUrls: ['./filecounts.component.css']
})
export class FilecountsComponent implements OnInit {

  userdetails = []
  remainingCount:number
  totalLimit:number = 100
  percentageCompleted:number
  alert:string
  count = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.userDetails().subscribe(response => {
      if (response.status) {
        console.log(response.count[0])
        let totalCount = response.count[0].totalCount
        this.percentageCompleted = Math.round(totalCount/this.totalLimit*100)
        console.log(this.percentageCompleted)
        this.remainingCount = this.totalLimit - totalCount
        
        if(this.remainingCount <= 0){
          this.remainingCount = 0
        }

        if (this.percentageCompleted >= 0 && this.percentageCompleted < 25){
          this.alert = "background-color:#28a745"
        }
        else if (this.percentageCompleted >= 25 && this.percentageCompleted < 50) {
          this.alert = "background-color:#17a2b8"
        }
        else if (this.percentageCompleted >= 50 && this.percentageCompleted < 75) {
          this.alert = "background-color:#ffc107"
        }
        else if (this.percentageCompleted >= 75 && this.percentageCompleted <= 100 ){
          this.alert = "background-color:#dc3545"
        }
        else if (this.percentageCompleted > 100 ){
          this.percentageCompleted = 100
          this.alert = "background-color:#dc3545"
        }

        this.count.push(response.count)
        console.log(this.count)
      }
    },
      error => console.log(error))
  }

}

