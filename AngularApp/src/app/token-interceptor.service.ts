import { Injectable } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService {

  constructor(private authService:AuthService) { }

  intercept(req:HttpRequest<any>,next:HttpHandler){

    const headers=this.authService.getToken();

    let tokenizedReq=req.clone({
      headers:req.headers.set("Authorization","Bearer " +this.authService.getToken())
    })
    return next.handle(tokenizedReq);
}
}
