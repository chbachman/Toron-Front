import {Component, HostListener, OnInit} from '@angular/core'
import { Discussion, ShowInfo } from '../show'
import {ActivatedRoute} from '@angular/router'
import {ToronBackendService} from '../toron-backend.service'

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})

export class ShowComponent implements OnInit {
  show: ShowInfo
  discussions: Discussion[]

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

  constructor(private route: ActivatedRoute, private backend: ToronBackendService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      this.getShows(parseInt(map.get('id'), 10))
    })
  }

  getShows(id: number) {
    this.backend.getShow(id).subscribe(show => {
      this.show = show.showInfo
      this.discussions = show.discussion
      this.data = {
        labels: show.showInfo.stats.scoreDistribution.map(it => it.score),
        datasets: [{
          data: show.showInfo.stats.scoreDistribution.map(it => it.amount),
          backgroundColor: '#FFFFFF22',
          borderColor: '#FFFFFF'
        }],
      }
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    this.toolbarStyle = scroll < 100 ? 'top' : 'bottom'
  }
}
