import { Component, OnInit } from '@angular/core';
import {MessageService,ConfirmationService,ConfirmEventType} from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  category : any;
  selectedCategory : any;
  display: boolean = false;
  admin: boolean = false;
  constructor(private messageService: MessageService,private http: HttpClient,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getcategories();
    this.admin = localStorage.getItem('admin') ? true : false;
  }
  getcategories(){
    this.http.get<any>('http://localhost:8000/getallcategories').subscribe(data => {
      this.category = data
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
         this.http.post<any>('http://localhost:8000/delcategory', deleteId, {headers}).subscribe(data => {
                 console.log('data---',data);
                 this.messageService.add({severity:'success', summary:'Delete Category', detail:'Category deleted succesfully.'});
                 this.getcategories(); 
                })
             this.getcategories(); 
  }

  update(category : any){
      this.display = true;
      this.selectedCategory = category;
      this.selectedCategory.name1 = category.name;
      this.selectedCategory.desc1 = category.desc;
      console.log("selectedCategory--45-",this.selectedCategory);
  }
  
  onUpdate(updateForm: any){
    console.log('form---',updateForm);
    console.log("selectedCategory---",this.selectedCategory);
    const headers = { 'Access-Control-Allow-Origin': '*' };
    this.http.put<any>('http://localhost:8000/updateCategory', this.selectedCategory, {headers}).subscribe(data => {
               console.log('data---',data);
               this.messageService.add({severity:'success', summary:'Update Category', detail:'Category updated succesfully.'});
               this.getcategories(); 
              })
    updateForm.reset();
    this.display = false;
  }

  reset(form: any){
    form.reset();
  }
}
