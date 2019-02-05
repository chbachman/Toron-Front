import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ChartModule } from 'angular2-chartjs'
import { FormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faBars } from '@fortawesome/free-solid-svg-icons'
import { faUser, faComment, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ShowComponent } from './show/show.component'
import { ListComponent } from './list/list.component'
import { CachingInterceptor } from './caching-interceptor'
import { RequestCache } from './request-cache.service'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

import { InViewportModule } from '@thisissoon/angular-inviewport'
import { NavListComponent } from './nav-list/nav-list.component'
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ThreadComponent } from './thread/thread.component'

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    ListComponent,
    NavListComponent,
    NavBarComponent,
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ChartModule,
    InViewportModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    RequestCache,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(
      faChevronRight,
      faBars,
      faUser,
      faArrowAltCircleUp,
      faComment
    )
  }
}
