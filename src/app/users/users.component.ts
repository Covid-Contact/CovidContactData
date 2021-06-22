/*
 * Copyright (C) 2021  Albert Pinto
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
  fromAge: string = '16'
  toAge: string = '45'
  gender: string = ''

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

  onValueChanged() {
    const from = parseInt(this.fromAge)
    const to = parseInt(this.toAge)

    if (to < from) {
      this.toAge = this.fromAge
    }

    this.onFilterStatistics()
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

    this.barChartLabels = []
    this.barChartData[0].data = []
  }

  onNavigateToLocations() {
    this.router.navigate(['/locations'])
  }
}
