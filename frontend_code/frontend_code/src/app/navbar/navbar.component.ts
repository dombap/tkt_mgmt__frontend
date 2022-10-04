import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  loggedIn :boolean =false;
  userdata: any;
  admin: boolean = false;
  ngOnInit(): void {
 
  this.userdata = localStorage.getItem('user');
  this.loggedIn = this.userdata ? true : false;
  this.admin = localStorage.getItem('admin') ? true : false;
  }
  logout(){
    this.loginService.setloggedOut();
    localStorage.clear();
    this.router.navigateByUrl('/home')
  }

}
