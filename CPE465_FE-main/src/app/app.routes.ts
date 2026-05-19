import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { Result } from './result/result';
import { Business } from './business/business';

export const routes: Routes = [
  { path: '', component: Homepage },      // หน้าแรก
  { path: 'result', component: Result },   // หน้า result
  { path: 'business', component: Business }  // หน้า business

];
