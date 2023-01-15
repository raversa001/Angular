module.exports = app => {
  const assignments = require("../controllers/assignment.controller.js");

  var router = require("express").Router();

  // Create a new Assignment
  router.post("/", assignments.create);

  // Retrieve all Assignments
  router.get("/", assignments.findAll);

  // Retrieve all published Assignments
  router.get("/published", assignments.findAllPublished);

  // Retrieve a single Assignment with id
  router.get("/:id", assignments.findOne);

  // Update a Assignment with id
  router.put("/:id", assignments.update);

  // Delete a Assignment with id
  router.delete("/:id", assignments.delete);

  // Delete all Assignments
  router.delete("/", assignments.deleteAll);

  app.use('/api/assignments', router);
};
