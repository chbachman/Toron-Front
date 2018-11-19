import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Show } from './show'

@Injectable({
  providedIn: 'root'
})

export class ToronBackendService {
  constructor(private http: HttpClient) { }

  getList(): Observable<Show> {
    return this.http.get<Show>('http://localhost:8080/api/list.json')
  }
}
