import { from, Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MALShow, Show, ShowInfo } from './show'
import { NgForageCache } from 'ngforage'
import { concatMap, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ToronBackendService {
  constructor(private http: HttpClient, private cache: NgForageCache) { }

  baseUrl = 'https://api.chbachman.com/toron'
  malUrl = 'https://api.jikan.moe/v3/anime'

  private createCache<T>(key: string, produce: () => Observable<T>): Observable<T> {
    return from(this.cache.getCached<T>(key))
      .pipe(
        map(value => value.expired ? null : value.data),
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

  getList(): Observable<Show[]> {
    return this.createCache('list',
      () => this.http.get<Show[]>(`${this.baseUrl}/list`)
    )
  }

  getShow(id: number): Observable<Show> {
    return this.createCache(`show-${id}`,
      () => this.http.get<Show>(`${this.baseUrl}/show/${id}`)
    )
  }

  getMALShow(id: number): Observable<MALShow> {
    return this.createCache(`mal-${id}`,
      () => this.http.get<MALShow>(`${this.malUrl}/${id}`)
    )
  }

  getSearch(search: string): Observable<Show[]> {
    return this.createCache(`search-${search}`,
      () => this.http.get<Show[]>(`${this.baseUrl}/search?q=${search}`)
    )
  }
}
