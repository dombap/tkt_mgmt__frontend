import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {LoginService} from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : Login = {
    Email : '',
    Password : ''
  }
  constructor(private router: Router,private http: HttpClient,private messageService: MessageService,private loginService: LoginService) { }

  ngOnInit(): void {
  }
  onSubmit(loginForm : any){
    console.log('loginform----',loginForm.value);
    const headers = { 'Access-Control-Allow-Origin': '*' };
    this.http.post<any>('http://localhost:8000/login',loginForm.value).subscribe(data => {
      if(data.length > 0){
     if(data[0].email == 'admin@gmail.com') {
      localStorage.setItem('admin','true');
     }
        localStorage.setItem('user',data[0].id);
        this.router.navigateByUrl('/ticketform');
      } else {     
        this.messageService.add({severity:'warn', summary:'Login Error', detail:'Please check email and password.'});
        loginForm.reset();
      }
  })
   }
 
   reset(loginform : any) {
     loginform.reset();
   }
   
   signup(){
    this.router.navigateByUrl('/signup');
   }

}
