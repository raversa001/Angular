import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Assignment } from '../models/assignment.model'

const baseUrl = 'http://localhost:8080/api/assignments'

@Injectable({
	providedIn: 'root'
})
export class AssignmentService {
	constructor(private http: HttpClient) { }

	getAll(): Observable<Assignment[]> {
		return this.http.get<Assignment[]>(baseUrl)
	}

	get(id: any): Observable<Assignment> {
		return this.http.get<Assignment>(`${baseUrl}/${id}`)
	}

	create(data: any): Observable<any> {
		return this.http.post(baseUrl, data)
	}

	update(id: any, data: any): Observable<any> {
		return this.http.put(`${baseUrl}/${id}`, data)
	}

	delete(id: any): Observable<any> {
		return this.http.delete(`${baseUrl}/${id}`)
	}

	deleteAll(): Observable<any> {
		return this.http.delete(baseUrl)
	}

	filterAssignment(filter: any): Observable<Assignment[]> {
		return this.http.get<Assignment[]>(`${baseUrl}?filter=${filter}`)
	}

	getAllClasses(): Observable<Assignment[]> {		
		return this.http.get<Assignment[]>(baseUrl + "/classes")
	}

	getAllSubjects(): Observable<Assignment[]> {
		return this.http.get<Assignment[]>(baseUrl + "/subjects")
	}
}