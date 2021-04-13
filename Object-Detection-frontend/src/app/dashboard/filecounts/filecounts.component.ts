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
  totalLimit:number
  percentageCompleted:number
  alert:string
  count = []

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.userDetails().subscribe(response => {
      if (response.status) {
        let totalCount = response.count.length > 0 ? response.count : [];
        this.remainingCount = response.package[0].remainingCounts
        this.totalLimit = response.package[0].allotatedCounts

        if (totalCount.length > 0){
          this.percentageCompleted = Math.round(totalCount[0].totalCount/this.totalLimit*100)
          this.count.push(totalCount[0])
        }

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
      }
    },
      error => console.log(error))
  }

}

