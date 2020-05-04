import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  message='';

  constructor(private authService:AuthService) { }

  ngOnInit(){
    this.registerForm=new FormGroup({
      "email":new FormControl(null,Validators.email),
      "password":new FormControl(null,Validators.required)
    })
  }

  // registerUserData={
  //   "email":"",
  //   "password":""

  // };

  registerUser(){
    //console.log(this.registerUserData);
    this.authService.registerUser(this.registerForm.value)
    .subscribe(
      (res=>{
        console.log(res);
        this.message='User registerd';
      }),
      (err=>{
        console.log(err);
        this.message='Error in Registering'
      })
    );
  }

}
