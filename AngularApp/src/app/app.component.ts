import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';

  //isLogin$:Observable<boolean>;

  isAuthenticated=false;
  private userSub:Subscription;

  constructor(private _authService:AuthService){}

  ngOnInit(){
    //this.isLogin$=this._authService.isloggedIn;
    this.userSub=this._authService.user.subscribe(user=>{

      this.isAuthenticated=!!user;
      console.log(user);
      console.log(!user);
      console.log(!!user);

    });

}



onLogout(){
  this._authService.logout();
}

ngOnDestroy(){
  this.userSub.unsubscribe();
}


}
