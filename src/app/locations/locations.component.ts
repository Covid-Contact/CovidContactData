import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {Label} from "ng2-charts";
import {Router} from "@angular/router";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  location: String = ''

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Barcelona', 'Vilanova i la Geltru', 'Mataro', 'Sitges', 'Sant Boi', 'Girona', 'Puigcerda'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public colors: Array<any> = [
    {
      backgroundColor: 'rgb(102, 187, 106)',
    }
  ]

  public barChartData: ChartDataSets[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Interactions'}
  ];

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onFilterStatistics() {

  }

  onClear() {
    this.location = ''
  }

  onNavigateToUsers() {
    this.router.navigate(['/users'])
  }
}
