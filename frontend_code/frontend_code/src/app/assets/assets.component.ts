import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  assets: any[];
  selectedAssets: any;
  assetNumber: any;
  AssignTo: any;
  employeeList: any;
  scrollHeight: string = '100px';
  constructor(private http: HttpClient) {

    this.assets = [
      {type: 'Keyboard', Number: '1'},
      {type: 'Mouse',  Number: '2'},
      {type: 'Laptop', Number: '3'},
      {type: 'CPU', Number: '4'},
      {type: 'Headphones', Number: '5'}
  ];
}

ngOnInit(): void {

  {
    this.http.get<any>('http://localhost:8000/getallemployees').subscribe(data => {
      this.employeeList = data
  })
  }
}
onSubmit(assetForm : any){
  console.log('assetForm----',assetForm.value);
  console.log('assignto----',this.AssignTo);
let data ={
  assetType : this.selectedAssets.type,
  assetNumber: assetForm.value.assetNumber,
  assignTo: this.AssignTo.id
}
  const headers = { 'Access-Control-Allow-Origin': '*' };
  this.http.post<any>('http://localhost:8000/addasset', data, {headers}).subscribe(data => {
          console.log('data---',data);
      })
      assetForm.reset();
 }

 reset(categoryform : any) {
  categoryform.reset();
}

   }

 


