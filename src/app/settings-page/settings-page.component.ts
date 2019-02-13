import {Component, DoCheck, OnInit} from '@angular/core'
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'
import {Setting} from '../settings'
import {SettingsService} from '../settings.service'

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, DoCheck {
  Setting = Setting
  analytics: boolean
  redditApp: string
  apiType: string

  constructor(public activeModal: NgbActiveModal, private settings: SettingsService) { }

  ngDoCheck() {
    // console.log(`Something Changed. ${this.analytics} ${this.redditApp}`)
    // if (this.redditApp) { this.settings.set(Settings.RedditApp, this.redditApp) }
    // if (this.analytics) { this.settings.set(Settings.Analytics, this.analytics) }
  }

  ngOnInit() {
    this.settings.get<boolean>(Setting.Analytics)
      .subscribe(value => this.analytics = value)
    this.settings.get<string>(Setting.RedditApp)
      .subscribe(value => this.redditApp = value)
    this.settings.get<string>(Setting.ApiType)
      .subscribe(value => this.apiType = value)
  }

  change<T>(key: Setting, value: T) {
    this.settings.set(key, value)
  }


}
