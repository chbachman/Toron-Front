import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, Event} from '@angular/router'
import {filter, map, mergeMap} from 'rxjs/operators'
import {MatomoTracker} from 'ngx-matomo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private matomoTracker: MatomoTracker) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.matomoTracker.setCustomUrl(event.url)
        this.matomoTracker.setGenerationTimeMs(0)
        this.matomoTracker.trackPageView()
      }
    })
  }

  ngOnInit() {

  }
}
