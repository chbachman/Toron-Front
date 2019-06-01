import {Component, OnInit} from '@angular/core'
import {SettingsService} from '../settings.service'
import {Setting} from '../settings'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  enabled: boolean

  constructor(private settings: SettingsService) {}

  ngOnInit() {
    this.settings.get<boolean>(Setting.CreditShown).subscribe(value => this.enabled = value)
  }

}
