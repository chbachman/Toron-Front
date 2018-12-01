import { Injectable } from '@angular/core'
import { NgForage } from 'ngforage'
import { from, Observable } from 'rxjs'

export enum Preference {
  ApiType = 'APIType'
}

@Injectable({
  providedIn: 'root'
})
export class ToronPreferencesService {
  constructor(private cache: NgForage) { }

  set<T>(key: Preference, value: T): Observable<T> {
    return from(this.cache.setItem(key, value))
  }

  get<T>(key: Preference): Observable<T> {
    return from(this.cache.getItem(key))
  }
}
