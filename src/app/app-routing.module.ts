import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TestingComponent} from "./testing/testing.component";


const routes: Routes = [
  { path: 'testing', component: TestingComponent },
  { path: '', redirectTo: '/testing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
