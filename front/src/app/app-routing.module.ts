import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsListComponent } from './components/assignments-list/assignments-list.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './components/edit-assignment/edit-assignment.component';
import { WelcomeComponent } from './components/welcome/welcome.component'

const routes: Routes = [
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: 'welcome', component: WelcomeComponent },
	{ path: 'assignments', component: AssignmentsListComponent },
	{ path: 'add', component: AddAssignmentComponent },
	{ path: 'edit', redirectTo: 'assignments' },
	{ path: 'edit/:id', component: EditAssignmentComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }