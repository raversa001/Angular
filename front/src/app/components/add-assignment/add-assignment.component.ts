import { Component } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  assignment: Assignment = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private assignmentService: AssignmentService) { }

  saveAssignment(): void {
    const data = {
      title: this.assignment.title,
      description: this.assignment.description
    };

    this.assignmentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newAssignment(): void {
    this.submitted = false;
    this.assignment = {
      title: '',
      description: '',
      published: false
    };
  }

}