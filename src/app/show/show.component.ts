import {Component, OnInit} from '@angular/core'
import {Discussion, ShowInfo} from '../show'
import {ActivatedRoute} from '@angular/router'
import {ToronBackendService} from '../toron-backend.service'
import {SettingsService} from '../settings.service'
import {Setting} from '../settings'

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})

export class ShowComponent implements OnInit {
  show: ShowInfo
  discussions: Discussion[]
  rewatch: Discussion[]
  footerEnabled: boolean

  rootPath = false

  constructor(
    private route: ActivatedRoute,
    private backend: ToronBackendService,
    private settings: SettingsService
  ) { }

  ngOnInit() {
    this.route.url.subscribe(route => {
      this.rootPath = route.length === 0
    })

    this.route.paramMap.subscribe(map => {
      if (map.get('id') != null) {
        this.getShows(parseInt(map.get('id'), 10))
      }
    })

    this.settings.get<boolean>(Setting.CreditShown).subscribe(value => { this.footerEnabled = value })
  }

  getShows(id: number) {
    this.backend.getShow(id).subscribe(show => {
      this.show = show.info
      this.discussions = show.threads.filter(a => !a.rewatch).sort((a, b) => a.episode.start - b.episode.start)
      this.rewatch = show.threads.filter(a => a.rewatch).sort((a, b) => a.episode.start - b.episode.start)

      this.settings.get<string>(Setting.ApiType).subscribe(preference => {
        if (preference === 'MyAnimeList') {
          this.backend.getMALShow(show.info.idMal).subscribe(malShow => {
            this.show.description = malShow.synopsis
          })
        }
      })
    })
  }
}
