import {Injectable} from '@angular/core'
import {NgForage} from 'ngforage'
import {getDefault, Setting} from './settings'
import {BehaviorSubject, from, Observable} from 'rxjs'
import {flatMap, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private cache: NgForage) { }

  private subjects: { [key: string]: BehaviorSubject<any> } = {}

  set<T>(key: Setting, value: T) {
    this.cache.setItem(`settings:${key}`, value)

    if (this.subjects[key]) {
      this.subjects[key].next(value)
    }
  }

  get<T>(key: Setting): Observable<T> {
    if (!this.subjects[key]) {
      return this.create<T>(key)
    }

    return this.subjects[key] as Observable<T>
  }

  private create<T>(key: Setting): Observable<T> {
    return from(this.cache.getItem<T>(`settings:${key}`)).pipe(
      map(value => value == null ? getDefault(key) as unknown as T : value),
      flatMap(value => {
        if (this.subjects[key]) {
          return this.subjects[key]
        } else {
          return this.subjects[key] = new BehaviorSubject(value)
        }
      })
    )
  }
}
