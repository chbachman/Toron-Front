import { Component, OnInit } from '@angular/core';
import { ToronBackendService } from './toron-backend.service'
import { Show } from './show'

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private backend: ToronBackendService) { }

  shows: Show;

  getShows() {
    this.backend.getList().subscribe(shows => {
      this.shows = shows;
      console.log(shows);
    });
  }

  ngOnInit() {
    this.getShows();
  }

  title = 'Toron';

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
}
