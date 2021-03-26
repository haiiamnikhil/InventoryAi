import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexGrid
} from "ng-apexcharts";
import { ApiService } from 'src/app/services/api.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-countanalytics',
  templateUrl: './countanalytics.component.html',
  styleUrls: ['./countanalytics.component.css']
})
export class CountanalyticsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  category:string = "Choose..."
  defaultCategory:string
  startDate:Date
  endDate:Date
  isBusy:boolean = false
  data:any = []
  column:any = []
  processedDate:any = []
  processedCategory:any = []

  constructor(private apiService: ApiService) {
  }

  generateGraph(){
    this.chartOptions = {
      series: [
        {
          name: this.processedCategory,
          data: this.column
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.processedDate
      }
    };
  }

  ngOnInit(){
    this.apiService.getInventory().subscribe(response=>{
      if (response.status) {

        for (let i = 0; i < response.productCounts.length; i++) {
          
          let date = new Date(response.productCounts[i].lastUpdated)

          let year = date.getFullYear()
          let day = date.getDate()
          let month = date.toLocaleString('en-us',{month:'short'})
          let processedDate = day +  " " + month + " " + year

          this.column.push(response.productCounts[i].totalCount)
          this.processedDate.push(processedDate)
          this.processedCategory.push(response.productCounts[i].item)
        }

        this.data.push(response.productCounts)
        this.generateGraph()
        };
      }
    ,err=>console.log(err))
  }

  getAnalysis(){
    let data = {
      item:this.category,
      startDate:this.startDate,
      endDate:this.endDate
    }
    this.apiService.productHistory(data).subscribe(response=> {
      if(response.status){
        this.processedCategory = []
        this.column = []
        this.column = []
        for (let i = 0; i < response.message.length; i++){
          let date = new Date(response.message[i].addedDate)
          this.processedDate.push(date.getFullYear()+" "+ date.toLocaleString('en-us',{month:'short'})+" "+date.getDate())
          this.column.push(response.message[i].count)
          this.processedCategory.push(response.message[i].item)
        }
        this.generateGraph()
      }
    },err=> console.log(err))
  }
}