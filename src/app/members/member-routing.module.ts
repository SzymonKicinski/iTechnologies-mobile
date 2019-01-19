import { AuthGuardService } from './../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuardService]},
  { path: 'barcode', loadChildren: './barcode/barcode.module#BarcodePageModule', canActivate: [AuthGuardService]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MemberRoutingModule { }
