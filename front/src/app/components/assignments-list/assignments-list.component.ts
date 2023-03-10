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
	currentIndex = -1
	filter = ''
	currentPage = 0
	maxPage = 1
	doneLoading = false

	constructor(private assignmentService: AssignmentService) { }

	ngOnInit(): void {
		this.retrieveAssignments();
	}

	round5(x: number): number {
    	return Math.ceil(x/5)*5;
	}

	nextPage(): void {
		if(this.assignments === undefined)
			return

		if(this.currentPage + 1 >= this.round5(this.assignments.length) / 5)
			this.currentPage = -1

		this.currentPage += 1
		let rg = (this.currentPage * 5)
		
		this.pAssignments = this.assignments.slice(rg, rg + 5)
	}

	previousPage(): void {
		if(this.assignments === undefined)
			return

		if(this.currentPage < 1)
			this.currentPage = this.maxPage

		this.currentPage -= 1
		let rg = (this.currentPage * 5)
		
		this.pAssignments = this.assignments.slice(rg, rg + 5)
	}

	retrieveAssignments(): void {
		delete this.assignments
		delete this.pAssignments
		this.doneLoading = false

		this.assignmentService.getAll()
		.subscribe({
			next: (data) => {
				this.assignments = data
				this.pAssignments = data.slice(0, 5)
				this.maxPage = this.round5(data.length) / 5
				this.doneLoading = true
			},
			error: (e) => console.error(e)
		});
	}

	refreshList(): void {
		this.retrieveAssignments();
		this.currentAssignment = {}
		this.currentIndex = -1
		this.currentPage = 0
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

	filterAssignment(): void {
		delete this.assignments
		delete this.pAssignments
		this.currentAssignment = {}
		this.currentIndex = -1
		this.doneLoading = false

		this.assignmentService.filterAssignment(this.filter)
		.subscribe({
			next: (data) => {
				this.assignments = data
				this.pAssignments = data.slice(0, 5)
				this.maxPage = this.round5(data.length) / 5
				this.currentPage = 0
				this.doneLoading = true
			},
			error: (e) => console.error(e)
		});
	}

}