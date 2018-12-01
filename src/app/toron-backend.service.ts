import { from, Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Show, ShowInfo } from './show'
import { NgForageCache } from 'ngforage'
import { concatMap, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ToronBackendService {
  constructor(private http: HttpClient, private cache: NgForageCache) { }

  baseUrl = 'http://10.0.0.216:8080/api'

  private createCache<T>(key: string, produce: () => Observable<T>): Observable<T> {
    return from(this.cache.getCached<T>(key))
      .pipe(
        map(value => value.data),
        concatMap(value => {
          if (value == null) {
            console.log(`Cache Failed for ${key}`)
            return produce()
              .pipe(
                tap(newValue => this.cache.setCached(key, newValue))
              )
          } else {
            console.log(`Cache Succeeded for ${key}`)
            return of(value)
          }
        })
      )
  }

  getList(): Observable<ShowInfo[]> {
    return this.createCache('list',
      () => this.http.get<ShowInfo[]>(this.baseUrl + '/list')
    )
  }

  getShow(id: number): Observable<Show> {
    return this.createCache(`show-${id}`,
      () => this.http.get<Show>(`${this.baseUrl}/show/${id}`)
    )
  }
}
