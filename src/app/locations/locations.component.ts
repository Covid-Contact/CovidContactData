import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {Router} from "@angular/router";
import {StatisticsService} from "../statistics/statistics.service";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  type: string = ''
  location: string = ''

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public colors: Array<any> = [
    {
      backgroundColor: 'rgb(102, 187, 106)',
    }
  ]

  public barChartData: ChartDataSets[] = [
    {data: [], label: 'Interactions'}
  ];

  constructor(
    private router: Router,
    private statisticsService: StatisticsService
  ) {
  }

  ngOnInit(): void {
  }

  onClear() {
    this.location = ''
  }

  onNavigateToUsers() {
    this.router.navigate(['/users'])
  }

  onLocationChanged() {
    if (this.type != '' && this.location != '') {
      this.onFilterStatistics()
    }
  }

  onFilterStatistics() {
    const result = this.statisticsService.getLocationInteractions({
      country: this.type == 'country' ? this.location : '',
      region: this.type == 'region' ? this.location : '',
      province: this.type == 'province' ? this.location : '',
    })

    result.subscribe(
      data => {
        this.barChartLabels = data.xaxes
        this.barChartData[0].data = data.yaxes
      },
      error => {
        console.error(error)
      }
    )
  }
}
