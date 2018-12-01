import {Component, OnInit} from '@angular/core'
import {Preference, ToronPreferencesService} from '../toron-preferences.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private preferences: ToronPreferencesService) { }

  providers: string[] = ['AniList', 'MyAnimeList']
  provider: string

  onAPISelection() {
    this.preferences.set(Preference.ApiType, this.provider)
  }

  ngOnInit() {
    this.preferences.get<string>(Preference.ApiType)
      .subscribe(value => this.provider = value)
  }
}
