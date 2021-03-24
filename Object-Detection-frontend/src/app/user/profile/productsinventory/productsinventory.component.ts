import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-productsinventory',
  templateUrl: './productsinventory.component.html',
  styleUrls: ['./productsinventory.component.css']
})
export class ProductsinventoryComponent implements OnInit {

  productsCount:any = []
  csvFiles:any = []
  constructor(private apiService: ApiService) { }

  ngOnInit(){
    this.apiService.getInventory().subscribe(
      response => {
        if(response.status){
          this.productsCount.push(response.productCounts);
          this.csvFiles.push(response.csvFiles)
          console.log(this.csvFiles)
        }
      }
    )
  }

}
