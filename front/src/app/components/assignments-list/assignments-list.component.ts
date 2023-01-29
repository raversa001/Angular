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
	pAssignments?: Assignment[]
	currentAssignment: Assignment = {}
	currentIndex = -1;
	title = ''
	currentPage = 0;
	maxPage = 0;

	constructor(private assignmentService: AssignmentService) { }

	ngOnInit(): void {
		this.retrieveAssignments();
	}

	round5(x: number): number {
    	return Math.ceil(x/5)*5;
	}

	nextPage(): void {
		if(this.assignments === undefined || this.currentPage + 1 >= this.round5(this.assignments.length) / 5)
			return

		this.currentPage += 1
		let rg = (this.currentPage * 5)
		
		this.pAssignments = this.assignments.slice(rg, rg + 5)
	}

	previousPage(): void {
		if(this.assignments === undefined || this.currentPage < 1)
			return

		this.currentPage -= 1
		let rg = (this.currentPage * 5)
		
		this.pAssignments = this.assignments.slice(rg, rg + 5)
	}

	retrieveAssignments(): void {
		this.assignmentService.getAll()
		.subscribe({
			next: (data) => {
				this.assignments = data
				this.pAssignments = data.slice(0, 5)
				this.maxPage = this.round5(data.length) / 5
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
		this.assignmentService.delete(ass.assignmentId)
		.subscribe({
			next: (res) => {
				this.refreshList()
			},
			error: (e) => console.error(e)
		})
	}

	editAssignment(ass: any): void {
		console.log(ass)
	}

	searchTitle(): void {
		this.currentAssignment = {}
		this.currentIndex = -1

		this.assignmentService.findByTitle(this.title)
		.subscribe({
			next: (data) => {
				this.assignments = data
				this.pAssignments = data.slice(0, 5)
				this.maxPage = this.round5(data.length) / 5
			},
			error: (e) => console.error(e)
		});
	}

}