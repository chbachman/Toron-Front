import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {Show, ShowInfo} from './show'

@Injectable({
  providedIn: 'root'
})

export class ToronBackendService {
  constructor(private http: HttpClient) { }

  baseUrl = 'http://10.63.212.229:8080/api'

  getList(): Observable<ShowInfo[]> {
    return this.http.get<ShowInfo[]>(this.baseUrl + '/list')
  }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.baseUrl}/show/${id}`)
  }
}
