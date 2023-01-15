import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsListComponent } from './components/assignments-list/assignments-list.component';
import { AssignmentDetailsComponent } from './components/assignment-details/assignment-details.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';

const routes: Routes = [
  { path: '', redirectTo: 'assignments', pathMatch: 'full' },
  { path: 'assignments', component: AssignmentsListComponent },
  { path: 'assignments/:id', component: AssignmentDetailsComponent },
  { path: 'add', component: AddAssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }