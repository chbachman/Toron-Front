import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core'
import {Show} from '../show'
import {ToronBackendService} from '../toron-backend.service'
import {animate, style, transition, trigger} from '@angular/animations'

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  animations: [
    trigger('searchTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms 100ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 0 })
      ])
    ])
  ]
})
export class NavListComponent implements OnInit {
  constructor(private backend: ToronBackendService) { }

  shows: Show[]
  title = 'Toron'
  search: string

  @Input() active: number

  ngOnInit() {
    this.getShows()
  }

  getShows() {
    this.backend.getList().subscribe(shows => {
      this.shows = shows
    })
  }

  updateSearch() {
    if (this.search == null || this.search.length === 0) {
      this.getShows()
      return
    }

    console.log('Updating Search')

    this.backend.getSearch(this.search).subscribe(shows => {
      this.shows = shows
    })
  }

}
