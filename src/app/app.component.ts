import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core'
import { ToronBackendService } from './toron-backend.service'
import { Show } from './show'
import { trigger, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor() {}

  navbarCollapsed = true
  @Input() clear = false
  @Input() padding = true

  collapseNavbar() {
    this.navbarCollapsed = true
    console.log('Collapse')
  }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed
  }
}
