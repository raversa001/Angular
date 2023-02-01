const sql = require("./db.js");

// constructor
const Assignment = function(assignment) {
	this.assignedTime = assignment.assignedTime
	this.classId = assignment.classId
	this.description = assignment.description
	this.givenTime = assignment.givenTime
	this.subjectId = assignment.subjectId
};

Assignment.create = (newAssignment, result) => {
	sql.query("INSERT INTO assignments SET ?", newAssignment, (err, res) => {
		if(err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created assignment: ", { id: res.insertId, ...newAssignment });
		result(null, { id: res.insertId, ...newAssignment });
	});
};

Assignment.findById = (id, result) => {
	sql.query(`SELECT * FROM assignments WHERE assignmentId = ${id}`, (err, res) => {
		if(err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if(res.length) {
			result(null, res[0]);
			return;
		}

		result({ kind: "not_found" }, null);
	});
};

Assignment.getAll = (filter, result) => {
	let query = `SELECT assignmentId, 
	assignments.subjectId, 
	subjectName, 
	description, 
	from_unixtime(givenTime, '%d-%m-%y') as givenTime, 
	teacherLN, 
	from_unixtime(assignedTime, '%d-%m-%y') as assignedTime,
	assignments.classId,
	classes.className 
	FROM assignments, subjects, teachers, classes
	WHERE subjects.subjectId = assignments.subjectId 
	AND teacherId = giverId
	AND classes.classId = assignments.classId`

	if(filter)
		query += ` AND (subjectName LIKE '%${filter}%' OR teacherLN LIKE '%${filter}%' OR classname LIKE '%${filter}%')`	

	query += " ORDER BY assignmentId;"

	sql.query(query, (err, res) => {
		if(err) {
			result(null, err);
			return;
		}

		result(null, res);
	});
};

Assignment.getAllSubjects = (teacherId, result) => {
	let query = `SELECT subjectId, subjectName FROM subjects` // WHERE teacherId = ${teacherId}

	//if(filter)
	//	query += ` AND (subjectName LIKE '%${filter}%' OR teacherLN LIKE '%${filter}%')`	

	sql.query(query, (err, res) => {
		if(err) {
			result(null, err);
			return;
		}

		result(null, res);
	});
};

Assignment.getAllClasses = (teacherId, result) => {
	let query = `SELECT classId, className FROM classes` // WHERE teacherId = ${teacherId}

	//if(filter)
	//	query += ` AND (subjectName LIKE '%${filter}%' OR teacherLN LIKE '%${filter}%')`	

	sql.query(query, (err, res) => {
		if(err) {
			result(null, err);
			return;
		}

		result(null, res);
	});
};

Assignment.updateById = (id, assignment, result) => {
	sql.query(
		"UPDATE assignments SET classId = ?, subjectId = ?, givenTime = ?, description = ? WHERE assignmentId = ?",
		[assignment.classId, assignment.subjectId, assignment.givenTime, assignment.description, id],
		(err, res) => {
			if(err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if(res.affectedRows == 0) {
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("updated assignment: ", { id: id, ...assignment });
			result(null, { id: id, ...assignment });
		}
		);
};

Assignment.remove = (id, result) => {
	sql.query("DELETE FROM assignments WHERE assignmentId = ?", id, (err, res) => {
		if(err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		if(res.affectedRows == 0) {
	  // not found Assignment with the id
			result({ kind: "not_found" }, null);
			return;
		}

		console.log("deleted assignment with id: ", id);
		result(null, res);
	});
};

Assignment.removeAll = result => {
	sql.query("DELETE FROM assignments", (err, res) => {
		if(err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} assignments`);
		result(null, res);
	});
};

module.exports = Assignment;
