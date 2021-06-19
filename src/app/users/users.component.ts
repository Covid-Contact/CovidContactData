import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StatisticsService} from "../statistics/statistics.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  fromAge: string = '18'
  toAge: string = '30'
  gender: string = ''

  isDisabled = false

  public barChartOptions: ChartOptions = {
    responsive: true
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

  public fromAgeControl = new FormControl(this.fromAge, [
    Validators.min(1)
  ])

  public toAgeControl = new FormControl(this.toAge, [
    Validators.min(1)
  ])

  constructor(
    private router: Router,
    private statisticsService: StatisticsService
  ) {
  }

  ngOnInit(): void {
    this.onFilterStatistics()
  }

  onAgeChanged() {
    const from = parseInt(this.fromAge)
    const to = parseInt(this.toAge)
    this.isDisabled = from <= 0 || to <= 0 || from > to
  }

  onFilterStatistics(): void {
    const result = this.statisticsService.getUserInteractions({
      from: this.fromAge != '' ? parseInt(this.fromAge) : -1,
      to: this.toAge != '' ? parseInt(this.toAge) : -1,
      gender: this.gender
    })

    result.subscribe(
      data => {
        this.barChartLabels = data.xaxes.map(String)
        this.barChartData[0].data = data.yaxes
      },
      error => {
        console.error(error)
      }
    )
  }

  onClear() {
    this.fromAge = ''
    this.toAge = ''
    this.gender = ''
  }

  onNavigateToLocations() {
    this.router.navigate(['/locations'])
  }
}
