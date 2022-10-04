import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import{HomeComponent} from './home/home.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import{AboutComponent} from './about/about.component';
import{ContactComponent} from './contact/contact.component';
import{ListEmployeeComponent}from './list-employee/list-employee.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AssetsComponent } from './assets/assets.component';
import { ListAssetComponent } from './list-asset/list-asset.component';

const routes: Routes = [
  { path: 'addCategory', component: CreateCategoryComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'listCategory', component: ListCategoryComponent },
  { path: 'ticketform', component: TicketFormComponent },
  { path: 'home', component: HomeComponent },
  {path: 'listticket', component: ListTicketComponent },
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'listemployee', component: ListEmployeeComponent},
  {path: '', component: NavbarComponent},
  {path:'assets',component: AssetsComponent},
  {path:'listasset',component: ListAssetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
