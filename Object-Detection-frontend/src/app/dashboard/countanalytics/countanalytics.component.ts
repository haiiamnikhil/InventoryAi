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
  ApexGrid,
  ApexResponsive,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'

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

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
}

@Component({
  selector: 'app-countanalytics',
  templateUrl: './countanalytics.component.html',
  styleUrls: ['./countanalytics.component.css']
})
export class CountanalyticsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public donutChart : Partial<DonutChartOptions>

  category:string = "Choose..."
  defaultCategory:string
  startDate:Date
  endDate:Date
  isBusy:boolean = false
  data:any = []
  column:any = []
  processedDate:any = []
  processedCategory:any = []
  chartType:any = 'line'
  inputValue:any
  displayModal:boolean = true

  constructor(private apiService: ApiService) {
  }

  generateLineChart(){
    this.chartOptions = {
      series: [
        {
          name: this.processedCategory[0],
          data: this.column
        }
      ],
      chart: {
        width:"100%",
        height: 400,
        type: this.chartType.toLowerCase(),
        zoom: {
          enabled: true,
        }
      },
      dataLabels: {
        enabled: true
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

  generateDonutChart(){
    this.donutChart = {
      series: this.column,
      chart: {
        width:"100%",
        height:400,
        type: "donut"
      },
      labels: this.processedDate,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(){
    this.apiService.getInventory().subscribe(response=>{
      if (response.status) {

        console.log(response)

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
        this.generateLineChart()
        this.generateDonutChart()
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
        this.generateLineChart()
        this.generateDonutChart()
        // this.displayModal = false
      }
    },err=> console.log(err))
  }
}