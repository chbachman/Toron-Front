import {Component, Input, OnInit} from '@angular/core'
import {Discussion} from '../show'
import {SettingsService} from '../settings.service'
import {Setting} from '../settings'
import {map} from 'rxjs/operators'
import {DomSanitizer, SafeUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  @Input() thread: Discussion
  url: SafeUrl

  constructor(private settings: SettingsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.settings.get(Setting.RedditApp).pipe(
      map(app => {
        const url = this.thread.url
        switch (app) {
          case 'Reddit Website': return url
          case 'Narwhal': return `narwhal://open-url/${url}`
        }
      }),
      map(url => this.sanitizer.bypassSecurityTrustUrl(url))
    ).subscribe(url => {
      this.url = url
    })
  }
}
