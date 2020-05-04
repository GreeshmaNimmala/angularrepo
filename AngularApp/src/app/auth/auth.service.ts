import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class AuthService {

  //private login:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)

  user=new BehaviorSubject<boolean>(null);

  private register_url='http://localhost:3000/user/signup';
  private login_url='http://localhost:3000/user/login';

  constructor(private http:HttpClient,private router:Router) { }

  registerUser(user:User){
    return this.http.post<any>(this.register_url,user);
  }

  loginUser(user:User){
    this.user.next(true);
    return this.http.post<any>(this.login_url,user);

  }

  // get isloggedIn(){
  //   //return this.login.asObservable();
  // }

  loggedIn(){
    return !!localStorage.getItem('token');
  }


  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('token');
    //this.login.next(false);
    this.router.navigate(['/events']);
  }

}
