import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private events_url='http://localhost:3000/user/events';
  private specialEvents_url='http://localhost:3000/user/special';

  constructor(private http:HttpClient) { }

  getEvents(){
    return this.http.get<any>(this.events_url);
  }

  getSpecialEvents(){
    return this.http.get<any>(this.specialEvents_url);
  }
}
