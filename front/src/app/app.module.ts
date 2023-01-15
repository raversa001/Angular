import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { AssignmentDetailsComponent } from './components/assignment-details/assignment-details.component';
import { AssignmentsListComponent } from './components/assignments-list/assignments-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAssignmentComponent,
    AssignmentDetailsComponent,
    AssignmentsListComponent
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
