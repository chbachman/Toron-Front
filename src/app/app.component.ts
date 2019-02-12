import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import {filter, map, mergeMap} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}
}
