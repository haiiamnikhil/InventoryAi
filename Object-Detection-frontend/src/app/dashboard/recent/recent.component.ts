import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {

  inventory:any = []

  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.getInventory().subscribe(response=> {
      if (response.status){
        this.inventory.push(response.productCounts)
        console.log(this.inventory)
      }
      else return
    }, err=> console.log(err))
  }
}
