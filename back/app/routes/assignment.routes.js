module.exports = app => {
	const assignments = require("../controllers/assignment.controller.js")

	var router = require("express").Router()  
	router.post("/", assignments.create)  
	
	router.get("/", assignments.findAll)  
	router.get("/published", assignments.findAllPublished)  
	router.get("/classes", assignments.findAllClasses)
	router.get("/subjects", assignments.findAllSubjects)
	router.get("/:id", assignments.findOne)  
	
	router.put("/:id", assignments.update)  
	
	router.delete("/:id", assignments.delete)  
	router.delete("/", assignments.deleteAll)
	
	app.use('/api/assignments', router)
}
