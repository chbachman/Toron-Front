import {Component, HostListener, OnInit} from '@angular/core'
import {Discussion, ShowInfo} from '../show'
import {ActivatedRoute} from '@angular/router'
import {ToronBackendService} from '../toron-backend.service'
import {Preference, ToronPreferencesService} from '../toron-preferences.service'
import {Title} from '@angular/platform-browser'

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})

export class ShowComponent implements OnInit {
  show: ShowInfo
  discussions: Discussion[]
  rewatch: Discussion[]

  toolbarStyle = false

  rootPath = false

  constructor(
    private route: ActivatedRoute,
    private backend: ToronBackendService,
    private preferences: ToronPreferencesService,
    private title: Title
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
  }

  getShows(id: number) {
    this.backend.getShow(id).subscribe(show => {
      this.show = show.info
      this.discussions = show.threads.filter(a => !a.rewatch).sort((a, b) => a.episode.start - b.episode.start)
      this.rewatch = show.threads.filter(a => a.rewatch).sort((a, b) => a.episode.start - b.episode.start)

      this.preferences.get<string>(Preference.ApiType).subscribe(preference => {
        if (preference === 'MyAnimeList') {
          this.backend.getMALShow(show.info.idMal).subscribe(malShow => {
            this.show.description = malShow.synopsis
          })
        }
      })
    })
  }

  switchTitle(inViewport: boolean) {
    this.toolbarStyle = inViewport
  }
}
