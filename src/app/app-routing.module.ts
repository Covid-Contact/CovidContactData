import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {LocationsComponent} from "./locations/locations.component";


const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'locations', component: LocationsComponent},
  {path: '', redirectTo: '/users', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
