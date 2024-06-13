import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { HttpClient } from "@angular/common/http";
import { User } from "./user.model";


export interface AuthResponseData {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private router: Router, private http: HttpClient) {}

  registerUser(authData: AuthData) {
    this.authSuccessfully();
  }

  login(authData: AuthData) {

    this.http
    .post<AuthResponseData>(
      'http://localhost:8080/api/v1/auth/authenticate',
      authData
    )
    .subscribe(response => {
      console.log(response);
      const user = new User(authData.email, response.access_token, response.refresh_token );
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
      this.authSuccessfully();
    }, errorMessage => {
      

    });
   
    
  }

  autoLogin() {
    const userData: {
      email: string;
      
      token: string;
      refreshToken: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.token,
      userData.refreshToken
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  } 

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }



  private authSuccessfully() {
    
    this.router.navigate(['/book']);
  }
}