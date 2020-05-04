import { Component, OnInit } from '@angular/core';
import { EventsService } from '../auth/events.service';
import { error } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

  specialEvents=[];

  constructor(private eventsService:EventsService,private router:Router) { }

  ngOnInit(){
    this.eventsService.getSpecialEvents()
    .subscribe(
      (result=>{
      this.specialEvents=result;
    }),
    (error=>{
      console.log(error);
      if(error instanceof HttpErrorResponse){
        if(error.status === 401){
          this.router.navigate(['/login']);
        }
      }
    })
    );
  }

}
