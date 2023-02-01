import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { AssignmentsListComponent } from './components/assignments-list/assignments-list.component';
import { LoginComponent } from './components/login/login.component';
import { EditAssignmentComponent } from './components/edit-assignment/edit-assignment.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
	declarations: [
		AppComponent,
		AddAssignmentComponent,
		AssignmentsListComponent,
		LoginComponent,
		EditAssignmentComponent,
  WelcomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule  
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
