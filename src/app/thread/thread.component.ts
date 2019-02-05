import {Component, Input, OnInit} from '@angular/core'
import {Discussion} from '../show'

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  @Input() thread: Discussion

  constructor() { }

  ngOnInit() {
  }

}
