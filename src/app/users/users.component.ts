import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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
    responsive: true
  };
  public barChartLabels: Label[] = ['18', '19', '20', '21', '22', '23', '24'];
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

  constructor(
    private router: Router
  ) {
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

  onClear() {
    this.fromAge = ''
    this.toAge = ''
    this.gender = ''
  }

  onNavigateToLocations() {
    this.router.navigate(['/locations'])
  }
}
