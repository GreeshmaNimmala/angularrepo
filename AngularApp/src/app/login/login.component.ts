import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginUserData={
  //   "email":"",
  //   "password":""

  // }
  loginForm:FormGroup;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(){
    this.loginForm=new FormGroup({
      "email":new FormControl(null,Validators.email),
      "password":new FormControl(null,Validators.required)
    })

  }

  loginUser(){
  console.log(this.loginForm.value);
  this.authService.loginUser(this.loginForm.value)
  .subscribe(
    (result=>{
      console.log(result)
      localStorage.setItem('token',result.token)
      this.router.navigate(['/special']);

    }),
    (error=>{
      console.log(error);
    })
  );
  }


}
