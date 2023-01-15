import { Component, Input, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentAssignment: Assignment = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';

  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getAssignment(this.route.snapshot.params["id"]);
    }
  }

  getAssignment(id: string): void {
    this.assignmentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentAssignment = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentAssignment.title,
      description: this.currentAssignment.description,
      published: status
    };

    this.message = '';

    this.assignmentService.update(this.currentAssignment.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentAssignment.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateAssignment(): void {
    this.message = '';

    this.assignmentService.update(this.currentAssignment.id, this.currentAssignment)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This assignment was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteAssignment(): void {
    this.assignmentService.delete(this.currentAssignment.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/assignments']);
        },
        error: (e) => console.error(e)
      });
  }

}