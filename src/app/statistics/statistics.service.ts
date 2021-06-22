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

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = "http://covidcontact.cat:8080/statistics"
  private userStatisticsUrl = this.baseUrl + "/user"
  private userInteractionsUrl = this.userStatisticsUrl + "/interactions"
  private locationStatisticsUrl = this.baseUrl + "/location"
  private locationInteractionsUrl = this.locationStatisticsUrl + "/interactions"

  constructor(
    private http: HttpClient
  ) {
  }

  getUserInteractions(params: UserInteractionParams) {
    let queryParams = new HttpParams()
    if (params.from != -1) {
      queryParams = queryParams.append('from', params.from)
    }

    if (params.to != -1) {
      queryParams = queryParams.append('to', params.to)
    }

    if (params.gender != '') {
      queryParams = queryParams.append('gender', params.gender)
    }

    console.log(queryParams)

    return this.http.get<UserStatistics>(this.userInteractionsUrl, {params: queryParams})
  }

  getLocationInteractions(params: LocationInteractionParams) {
    let queryParams = new HttpParams()

    if (params.country != '') {
      queryParams = queryParams.set('country', params.country)
    } else if (params.region != '') {
      queryParams = queryParams.set('region', params.region)
    } else if (params.province != '') {
      queryParams = queryParams.set('province', params.province)
    }

    return this.http.get<LocationStatistics>(this.locationInteractionsUrl, {params: queryParams})
  }
}
