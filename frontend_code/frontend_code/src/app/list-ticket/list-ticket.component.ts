import { Component, OnInit } from '@angular/core';
import {MessageService,ConfirmationService} from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {
  ticket : any;
  selectedticket : any;
  display: boolean = false;
  employeeList: [] = [];
  scrollHeight: string = '100px';
  category : any;
  displayAssign : boolean = false;
  assigneeDetails : string = '';
  admin: boolean = false;
  constructor(private messageService: MessageService,private http: HttpClient,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
   this.gettickets();
   this.http.get<any>('http://localhost:8000/getallemployees').subscribe(data => {
    this.employeeList = data
})
this.http.get<any>('http://localhost:8000/getallcategories').subscribe(data => {
  this.category = data
})
this.admin = localStorage.getItem('admin') ? true : false;
  }
  gettickets(){
    this.http.get<any>('http://localhost:8000/getticketslist').subscribe(data => {
      this.ticket = data
      console.log('this.ticket----',this.ticket);
  })
  }

  confirm(id:number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            this.delete(id);
        }
    });
}

  delete(id: number){
    let deleteId = { deleteId : id }       
    const headers = { 'Access-Control-Allow-Origin': '*' };
    this.http.post<any>('http://localhost:8000/delticket', deleteId, {headers}).subscribe(data => {
            console.log('data---',data);
            this.messageService.add({severity:'success', summary:'Delete ticket', detail:'ticket deleted succesfully.'});
            this.gettickets(); 
           })
        this.gettickets(); 
}
  update(ticket : any){
      this.display = true;
      this. selectedticket= ticket;
      console.log(" selectedticket--45-",this. selectedticket);
      this.selectedticket.createdBy1 = ticket.created_by_id;
      this.selectedticket.desc1 = ticket.description;
      this.selectedticket.createdFor1 = ticket.created_for_id;
      this.selectedticket.category1 = ticket.category_id;
  }

  onUpdate(updateForm: any){
    console.log('form---',updateForm);
    console.log("selectedCategory---",this.selectedticket);
    const headers = { 'Access-Control-Allow-Origin': '*' };
    this.http.put<any>('http://localhost:8000/updateticket', this.selectedticket, {headers}).subscribe(data => {
               console.log('data---',data);
               this.messageService.add({severity:'success', summary:'Update Ticket', detail:'Ticket updated succesfully.'});
               this.gettickets(); 
              })
    updateForm.reset();
    this.display = false;
  }
  reset(form: any){
    form.reset();
  }

  assign(ticket : any) {
    this.assigneeDetails = '';
    this.displayAssign = true;
    this.selectedticket = ticket;
    let selectedId = { selectedId : ticket.id }  
    console.log('this.selectedticket----',this.selectedticket);
    this.http.post<any>('http://localhost:8000/getassignee', selectedId).subscribe(data => {
            console.log('data---',data);
            if(data.length >0){
              this.assigneeDetails = data[0].firstName + ' '+ data[0].lastName;
            }
          
           })
}

updateAssign(ticketAssignForm : any){
console.log('selectedticket---',this.selectedticket);
console.log('ticketAssignForm---',ticketAssignForm);
const headers = { 'Access-Control-Allow-Origin': '*' };
this.http.put<any>('http://localhost:8000/updateassignto', this.selectedticket, {headers}).subscribe(data => {
           console.log('data---',data);
           this.messageService.add({severity:'success', summary:'Add Assign To ', detail:'Ticket assigned succesfully.'});
           this.gettickets(); 
          })
          ticketAssignForm.reset();
this.displayAssign = false;
}
}
