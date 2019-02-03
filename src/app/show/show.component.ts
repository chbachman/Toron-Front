import {Component, HostListener, OnInit} from '@angular/core'
import {Discussion, ShowInfo} from '../show'
import {ActivatedRoute} from '@angular/router'
import {ToronBackendService} from '../toron-backend.service'
import {Preference, ToronPreferencesService} from '../toron-preferences.service'

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})

export class ShowComponent implements OnInit {
  show: ShowInfo
  discussions: Discussion[]
  rewatch: Discussion[]

  toolbarStyle = 'top'

  type = 'line'
  data: any = {
    labels: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }
  options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    }
  }

  constructor(private route: ActivatedRoute, private backend: ToronBackendService, private preferences: ToronPreferencesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.getShows(parseInt(map.get('id'), 10))
    })
  }

  getShows(id: number) {
    this.backend.getShow(id).subscribe(show => {
      this.show = show.info
      this.discussions = show.threads.filter(a => !a.rewatch).sort((a, b) => a.episode.start - b.episode.start)
      this.rewatch = show.threads.filter(a => a.rewatch).sort((a, b) => a.episode.start - b.episode.start)
      this.data = {
        labels: show.info.stats.scoreDistribution.map(it => it.score),
        datasets: [{
          data: show.info.stats.scoreDistribution.map(it => it.amount),
          backgroundColor: '#FFFFFF22',
          borderColor: '#FFFFFF'
        }],
      }

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
    this.toolbarStyle = inViewport ? 'top' : 'bottom'
    console.log(inViewport ? 'top' : 'bottom')
  }
}
