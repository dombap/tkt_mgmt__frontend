import { Component, OnInit } from '@angular/core';
import { ticket } from '../models/ticket';
import { HttpClient } from '@angular/common/http';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  Ticket : ticket = {
    createdBy: '',
    createdFor: '',
    category: '',
    description: ''
  }
 employeeList: [] = [];
 category : any;
 selectedname: any;
 selectedId: any;
 scrollHeight: string = '100px';
  constructor(private http: HttpClient,private messageService: MessageService) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8000/getallemployees').subscribe(data => {
      this.employeeList = data
  })
  this.http.get<any>('http://localhost:8000/getallcategories').subscribe(data => {
    this.category = data
})
  }
  onSubmit(ticketData : any){
    console.log('form----',ticketData);
    let data = {
      createdBy : ticketData.createdBy.id,
      createdFor: ticketData.createdFor.id,
      category: ticketData.category.id,
      desc: ticketData.description
    }
    const headers = { 'Access-Control-Allow-Origin': '*' };
    this.http.post<any>('http://localhost:8000/addticket', data, {headers}).subscribe(data => {
            console.log('data---',data);
            this.messageService.add({severity:'success', summary:'Add Ticket', detail:'Ticket created succesfully.'});
            this.Ticket.category = '';
            this.Ticket.createdBy = '';
            this.Ticket.createdFor = '';
            this.Ticket.description = '';
        })
  }
}
