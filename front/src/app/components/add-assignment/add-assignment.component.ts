import { Component } from '@angular/core'
import { Assignment } from 'src/app/models/assignment.model'
import { AssignmentService } from 'src/app/services/assignment.service'

@Component({
	selector: 'app-add-assignment',
	templateUrl: './add-assignment.component.html',
	styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
	assignments?: Assignment[]

	assignment: Assignment = {
		title: '',
		description: '',
		published: false
	}
	submitted = false

	constructor(private assignmentService: AssignmentService) { }

	ngOnInit(): void {
		this.retrieveClasses()

		// add check to see which teacher is on
	}

	retrieveClasses(): void {
		this.assignmentService.getAllClasses()
		.subscribe({
			next: (data) => {
				this.assignments = data
				console.log(data)
			},
			error: (e) => console.error(e)
		});
	}

	saveAssignment(): void {
		const data = {
			classId: this.assignment.classId,
			givenTime: this.assignment.givenTime,
			assignedTime: Date.now(),
			description: this.assignment.description
		};

		console.log(data)

		if(true)
			return

		this.assignmentService.create(data)
		.subscribe({
			next: (res) => {
				console.log(res)
				this.submitted = true
			},
			error: (e) => console.error(e)
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