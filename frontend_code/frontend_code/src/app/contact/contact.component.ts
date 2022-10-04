import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient, private messageService: MessageService) { }
  firstName: any;
  lastName:any;
  email:any;
  comment:any;

  ngOnInit(): void {
  }

  submit(){
    const headers = { 'Access-Control-Allow-Origin': '*' };
    let data = {
      firstName: this.firstName,
     lastName:this.lastName,
     email:this.email,
      comment:this.comment
    }
    this.http.post<any>('http://localhost:8000/sendmail', data, {headers}).subscribe(data => {
      console.log('data----------------',data);
      // this.messageService.add({severity:'success', summary:'Add User', detail:'User added succesfully.'});
        })
    this.firstName ='';
    this.lastName = '';
    this.email ='';
    this.comment = '';
    this.messageService.add({severity:'success', summary:'Contact Us', detail:'You have submitted form successfully. We have sent you mail,Please check.'});
  }
}
