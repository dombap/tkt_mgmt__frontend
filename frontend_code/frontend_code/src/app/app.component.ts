import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import {LoginService} from './login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  visibility: boolean = true;
  constructor(private loginService: LoginService,private router:Router,private activatedRoute:ActivatedRoute)
  {}
  loggedIn :boolean =false;
  title = 'angular-ticket-management-system';
  visible:boolean=false;
  ngOnInit(): void {
    // this.router.events.pipe(
    //   filter(events=>events instanceof NavigationEnd),
    //   map(evt =>this.activatedRoute),
    //   map(route => {
    //   while(route.firstChild) {
    //   route = route.firstChild;
    //   }
    //   return route;
    //   }))
    //   .pipe(
    //   filter(route => route.outlet === "primary"),
    //   mergeMap(route => route.data)
    //   ).subscribe(x=>x['header']===true ?this.visibility=true:this.visibility=false)
      
  this.loggedIn = this.loginService.loggedIn;
  }
  logout(){
    this.loginService.setloggedOut();
  }
}
function subscribe(arg0: (x: any) => boolean) {
  throw new Error('Function not implemented.');
}

