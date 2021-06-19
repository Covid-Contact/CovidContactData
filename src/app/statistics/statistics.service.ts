import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = 'http://covidcontact.cat:8080/statistics'
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
      queryParams = queryParams.set('from', params.from)
    }

    if (params.to != -1) {
      queryParams = queryParams.set('to', params.to)
    }

    if (params.gender != '') {
      queryParams = queryParams.set('gender', params.gender)
    }

    return this.http.get<UserStatistics>(this.userInteractionsUrl, {params: queryParams})
  }
}
