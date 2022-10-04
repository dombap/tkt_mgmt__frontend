import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MessageService,ConfirmationService,ConfirmEventType} from 'primeng/api';

@Component({
  selector: 'app-list-asset',
  templateUrl: './list-asset.component.html',
  styleUrls: ['./list-asset.component.css']
})
export class ListAssetComponent implements OnInit {
  asset : any;
  assets: any[];
  selectedAssets: any;
  admin: boolean = false;
  selectedticket : any;
  scrollHeight: string = '100px';
  display: boolean = false;
  selectedasset : any;
  assetList:any;
  employeeList: [] = [];
  displayAssign : boolean = false;

  constructor(private http: HttpClient, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.assets = [
      {type: 'Keyboard', Number: '1'},
      {type: 'Mouse',  Number: '2'},
      {type: 'Laptop', Number: '3'},
      {type: 'CPU', Number: '4'},
      {type: 'Headphones', Number: '5'}
  ];
 
}
 
  ngOnInit(): void {
    this.getAsset();
    this.admin = localStorage.getItem('admin') ? true : false;
  }
  getAsset(){
    this.http.get<any>('http://localhost:8000/getassets').subscribe(data => {
      this.asset = data
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
  this.http.post<any>('http://localhost:8000/delasset', deleteId, {headers}).subscribe(data => {
          console.log('data---',data);
          this.messageService.add({severity:'success', summary:'Delete Asset', detail:'Asset deleted succesfully.'});
          this.getAsset(); 
         })
      this.getAsset(); 
      
}

update(asset : any){
  this.display = true;
  this.selectedasset= asset;
  console.log(" selectedasset--45-",this.selectedasset);  
  this.selectedasset.type =asset.asset_type;
  this.selectedasset.number =asset.asset_number;
}


onUpdate(updateForm: any){
  console.log('form---',updateForm);
  console.log("selectedCategory---",this.selectedasset);
  const headers = { 'Access-Control-Allow-Origin': '*' };
  this.http.put<any>('http://localhost:8000/updateasset', this.selectedasset, {headers}).subscribe(data => {
             console.log('data---',data);
             this.messageService.add({severity:'success', summary:'Update Asset', detail:'Asset updated succesfully.'});
             this.getAsset(); 
            })
  updateForm.reset();
  this.display = false;
}


reset(form: any){
  form.reset();
}

}

