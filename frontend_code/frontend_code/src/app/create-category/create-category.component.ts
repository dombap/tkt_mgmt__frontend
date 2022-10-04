import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category : Category = {
    name : '',
    desc : ''
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(categoryForm : any){
   console.log('categoryform----',categoryForm.value);
   const headers = { 'Access-Control-Allow-Origin': '*' };
   this.http.post<any>('http://localhost:8000/addcategory', categoryForm.value, {headers}).subscribe(data => {
           console.log('data---',data);
       })
       categoryForm.reset();
  }

  reset(categoryform : any) {
    categoryform.reset();
  }
}
