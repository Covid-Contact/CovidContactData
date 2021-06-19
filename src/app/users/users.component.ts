import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  fromAge: string = ''
  toAge: string = ''
  gender: string = ''

  isDisabled = false

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
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

  public fromAgeControl = new FormControl(this.fromAge, [
    Validators.min(1)
  ])

  public toAgeControl = new FormControl(this.toAge, [
    Validators.min(1)
  ])

  constructor() {
  }

  ngOnInit(): void {

  }

  onAgeChanged() {
    const from = parseInt(this.fromAge)
    const to = parseInt(this.toAge)
    this.isDisabled = from <= 0 || to <= 0 || from > to
  }

  onGenderChanged() {
    console.log(this.gender)
  }

  onFilterStatistics(): void {

  }
}
