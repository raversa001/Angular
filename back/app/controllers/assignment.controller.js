const Assignment = require("../models/assignment.model.js");

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "empty content!"
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
					err.message || "create failed!"
			});
		else res.send(data);
	});
};

exports.findAll = (req, res) => {
	const filter = req.query.filter;

	Assignment.getAll(filter, (err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "findAll failed!"
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
					err.message || "findAllSubjects failed!"
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
					err.message || "findAllClasses failed!"
			});
		else res.send(data);
	});
};

exports.findOne = (req, res) => {
	Assignment.findById(req.params.id, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `id ${req.params.id} not found!`
				});
			} else {
				res.status(500).send({
					message: "retrieving id " + req.params.id + " failed!"
				});
			}
		} else res.send(data);
	});
};

exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "empty content!"
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
						message: `id ${req.params.id} not found! (update)`
					});
				} else {
					res.status(500).send({
						message: "update failed for id " + req.params.id + "!"
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
					message: `id ${req.params.id} not found! (delete)`
				});
			} else {
				res.status(500).send({
					message: "delete failed for id " + req.params.id + "!"
				});
			}
		} else res.send({ message: `Suppression réussie!` });
	});
};

exports.deleteAll = (req, res) => {
	Assignment.removeAll((err, data) => {
		if (err)
			res.status(500).send({
				message:
					err.message || "deleteAll failed!"
			});
		else res.send({ message: `Suppression totale réussie!` });
	});
};
