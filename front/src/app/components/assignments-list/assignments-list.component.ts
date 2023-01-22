import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
	selector: 'app-assignments-list',
	templateUrl: './assignments-list.component.html',
	styleUrls: ['./assignments-list.component.css']
})
export class AssignmentsListComponent implements OnInit {
	assignments?: Assignment[]
	currentAssignment: Assignment = {}
	currentIndex = -1;
	title = ''

	constructor(private assignmentService: AssignmentService) { }

	ngOnInit(): void {
		this.retrieveAssignments();
	}

	retrieveAssignments(): void {
		this.assignmentService.getAll()
		.subscribe({
			next: (data) => {
				this.assignments = data
			},
			error: (e) => console.error(e)
		});
	}

	refreshList(): void {
		this.retrieveAssignments();
		this.currentAssignment = {}
		this.currentIndex = -1
	}

	setActiveAssignment(assignment: Assignment, index: number): void {
		this.currentAssignment = assignment
		this.currentIndex = index
	}

	removeAllAssignments(): void {
		this.assignmentService.deleteAll()
		.subscribe({
			next: (res) => {
				this.refreshList()
			},
			error: (e) => console.error(e)
		});
	}

	removeAssignment(ass: any): void {
		this.assignmentService.delete(ass.subjectId)
		.subscribe({
			next: (res) => {
				this.refreshList()
			},
			error: (e) => console.error(e)
		})
	}

	searchTitle(): void {
		this.currentAssignment = {};
		this.currentIndex = -1

		this.assignmentService.findByTitle(this.title)
		.subscribe({
			next: (data) => {
				this.assignments = data;
				console.log(data)
			},
			error: (e) => console.error(e)
		});
	}

}