import { Component, OnInit } from '@angular/core';
import {MessageService,ConfirmationService} from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  ticket : any;
  selectedticket : any;
  display: boolean = false;
  employeeList: [] = [];
  scrollHeight: string = '100px';
  category : any;
  selectedEmployee : any;
  admin: boolean = false;
  constructor(private messageService: MessageService,private http: HttpClient,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  this.getEmployees();
  this.admin = localStorage.getItem('admin') ? true : false;
  }

  getEmployees(){
    this.http.get<any>('http://localhost:8000/getallemployees').subscribe(data => {
      this.employeeList = data
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
    this.http.post<any>('http://localhost:8000/delemployee', deleteId, {headers}).subscribe(data => {
            console.log('data---',data);
          this.getEmployees();
          })
  this.getEmployees();
    }

    update(employee : any){
      console.log('emp----',employee);
      this.display = true;
      this.selectedEmployee = employee;
  }
  
  onUpdate(updateForm: any){
    console.log('form---',updateForm);
   console.log('this.selectedEmployee ---',this.selectedEmployee );
    const headers = { 'Access-Control-Allow-Origin': '*' };
    this.http.put<any>('http://localhost:8000/updateemployee', this.selectedEmployee, {headers}).subscribe(data => {
               console.log('data---',data);
               this.messageService.add({severity:'success', summary:'Update Employee', detail:'Employee updated succesfully.'});
               this.getEmployees(); 
              })
    updateForm.reset();
    this.display = false;
  }

  reset(form: any){
    form.reset();
  }




    }
