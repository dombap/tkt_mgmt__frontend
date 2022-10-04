import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  loggedIn: boolean = false;
  setloggedIn()  {
    this.loggedIn = true;
  }
  setloggedOut(){
    this.loggedIn = false;
  }
}
