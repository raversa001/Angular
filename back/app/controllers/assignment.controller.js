const Assignment = require("../models/assignment.model.js");

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	const assignment = new Assignment({
		assignedTime: req.body.assignedTime,
		classId: req.body.classId,
		subjectId: req.body.subjectId,
		description: req.body.description,
		givenTime: req.body.givenTime
	});

	Assignment.create(assignment, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Assignment."
			});
		else res.send(data);
	});
};

exports.findAll = (req, res) => {
	const title = req.query.title;

	Assignment.getAll(title, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving assignments."
			});
		else res.send(data);
	});
};

exports.findAllSubjects = (req, res) => {
	const teacherId = req.query.teacherId;

	Assignment.getAllSubjects(teacherId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving assignments."
			});
		else res.send(data);
	});
};

exports.findAllClasses = (req, res) => {
	const teacherId = req.query.teacherId;

	Assignment.getAllClasses(teacherId, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving assignments."
			});
		else res.send(data);
	});
};

// Find a single Assignment by Id
exports.findOne = (req, res) => {
	Assignment.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Assignment with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: "Error retrieving Assignment with id " + req.params.id
				});
			}
		} else res.send(data);
	});
};

exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	console.log(req.body);

	Assignment.updateById(
		req.params.id,
		new Assignment(req.body),
		(err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Assignment with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: "Error updating Assignment with id " + req.params.id
					});
				}
			} else res.send(data);
		}
	);
};

exports.delete = (req, res) => {
	Assignment.remove(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Assignment with id ${req.params.id}.`
				});
			} else {
				res.status(500).send({
					message: "Could not delete Assignment with id " + req.params.id
				});
			}
		} else res.send({ message: `Assignment was deleted successfully!` });
	});
};

exports.deleteAll = (req, res) => {
	Assignment.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all assignments."
			});
		else res.send({ message: `All Assignments were deleted successfully!` });
	});
};
