import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor() { }

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
