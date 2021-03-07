const Company = require("../models/company.model.js");

// Create and Save a new Company
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Company
    const company = new Company({
      name: req.body.name,
      share_value: req.body.share_value
    });
  
    // Save Company in the database
    Company.create(company, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Company."
        });
      else res.send(data);
    });
  };


// Retrieve all Companys from the database.
exports.findAll = (req, res) => {
    Company.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving companys."
        });
      else res.send(data);
    });
  };

// Find a single Company with a companyId
exports.findOne = (req, res) => {
    Company.findById(req.params.companyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Company with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Company with id " + req.params.companyId
          });
        }
      } else res.send(data);
    });
  };

// Update a Company identified by the companyId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Company.updateById(
      req.params.companyId,
      new Company(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Company with id ${req.params.companyId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Company with id " + req.params.companyId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Company with the specified companyId in the request
exports.delete = (req, res) => {
  Company.remove(req.params.companyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Company with id ${req.params.companyId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Company with id " + req.params.companyId
        });
      }
    } else res.send({ message: `Company was deleted successfully!` });
  });
};

// Delete all Companys from the database.
exports.deleteAll = (req, res) => {
    Company.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all companys."
        });
      else res.send({ message: `All Companys were deleted successfully!` });
    });
  };