import {Injectable} from '@angular/core'
import {NgForage} from 'ngforage'
import {getDefault, Setting} from './settings'
import {from, Observable} from 'rxjs'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private cache: NgForage) { }

  set<T>(key: Setting, value: T) {
    this.cache.setItem(`settings:${key}`, value)
  }

  get<T>(key: Setting): Observable<T> {
    return from(this.cache.getItem<T>(`settings:${key}`)).pipe(
      map(value => value == null ? getDefault(key) as unknown as T : value)
    )
  }
}
