import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {AppComponent} from './app.component'
import {ShowComponent} from './show/show.component'
import {ListComponent} from './list/list.component'
import {SettingsComponent} from './settings/settings.component'

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'show/:id', component: ShowComponent },
  { path: '', component: ListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
