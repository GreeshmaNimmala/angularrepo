import { Component, OnInit } from '@angular/core';
import { EventsService } from '../auth/events.service';
import { error } from 'protractor';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events=[];

  constructor(private eventService:EventsService) { }

  ngOnInit(){
    this.eventService.getEvents()
    .subscribe(
      (result=>{
        this.events=result;
      }),
      (error=>{
        console.log(error);
      })
    );
  }

}
