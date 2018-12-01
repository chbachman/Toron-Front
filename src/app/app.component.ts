import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core'
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

  inverted = false

  // TODO: Remove this after project submission.
  // TODO: Will also need to remove extra stuff in app.component.html
  @HostListener('window:deviceorientation', ['$event'])
  onKeyUp(event: DeviceOrientationEvent) {
    this.inverted = event.beta < 0
  }
}
