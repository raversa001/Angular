import { Component } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model'
import { AssignmentService } from 'src/app/services/assignment.service'

@Component({
	selector: 'app-edit-assignment',
	templateUrl: './edit-assignment.component.html',
	styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent {
	assignments?: Assignment[]
	subjects?: Assignment[]
	assId?: any
	assignment: Assignment = {}
	submitted = false
	givenTimeDate?: any

	constructor(private assignmentService: AssignmentService) {}

	ngOnInit(): void {
		this.retrieveClasses()
		this.retrieveSubjects()
		this.assId = window.location.href.split("/")[4]
		this.retrieveAssignment(this.assId)
		// add check to see which teacher is on
	}

	retrieveClasses(): void {
		this.assignmentService.getAllClasses()
		.subscribe({
			next: (data) => {
				this.assignments = data
			},
			error: (e) => console.error(e)
		});
	}

	retrieveSubjects(): void {
		this.assignmentService.getAllSubjects()
		.subscribe({
			next: (data) => {
				this.subjects = data
			},
			error: (e) => console.error(e)
		})
	}

	retrieveAssignment(id: any): void {
		this.assignmentService.get(id)
		.subscribe({
			next: (data) => {
				this.assignment = data
				this.assignment.givenTimeDate = new Date(data.givenTime! * 1000)
			},
			error: (e) => {
				console.error(`L'assigment avec l'ID ${id} n'existe pas!`)
				console.error(e)
				window.location.href = "/"
			}
		})
	}

	saveAssignment(): void {
		const data = {
			classId: this.assignment.classId,
			subjectId: this.assignment.subjectId,
			givenTime: this.assignment.givenTime,
			description: this.assignment.description
		};

		this.assignmentService.update(this.assId, data)
		.subscribe({
			next: (res) => {
				console.log(res)
				this.submitted = true
			},
			error: (e) => {
				console.error(e)
				window.location.href = "/assignments"
			}
		})
	}

	onChange(value:any): void {
		console.log(value)
	}

	newAssignment(): void {
		this.submitted = false;
		this.assignment = {
			title: '',
			description: '',
			published: false
		}
	}
}
