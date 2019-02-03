import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ToronBackendService } from '../toron-backend.service'
import { Show } from '../show'
import { animate, style, transition, trigger } from '@angular/animations'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {
  constructor() { }
}
