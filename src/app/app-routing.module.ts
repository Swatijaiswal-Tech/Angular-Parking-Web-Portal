import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '' ,
    component: HomeComponent},
  {
    path: 'home' ,
    component: HomeComponent},
  {
    path: 'dashboard' ,
    component: DashboardComponent
  },  
  {
    path: '**' ,
   component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
