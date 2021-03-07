const Subscription = require("../models/subscription.model.js");

// Create and Save a new Subscription
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Subscription
    const subscription = new Subscription({
      userId: req.body.userId,
      companyId: req.body.companyId
    });
  
    // Save Subscription in the database
    Subscription.create(subscription, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Subscription."
        });
      else res.send(data);
    });
  };


// Retrieve all Subscriptions from the database.
exports.findAll = (req, res) => {
    Subscription.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving subscriptions."
        });
      else res.send(data);
    });
  };

// Retrieve all Subscriptions from the database by userId.
exports.findAllByUserId = (req, res) => {
  Subscription.getAllByUserId((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subscriptions."
      });
    else res.send(data);
  });
};


// Find a single Subscription with a subscriptionId
exports.findOne = (req, res) => {
    Subscription.findById(req.params.subscriptionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Subscription with id ${req.params.subscriptionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Subscription with id " + req.params.subscriptionId
          });
        }
      } else res.send(data);
    });
  };


// Update a Subscription identified by the subscriptionId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Subscription.updateById(
      req.params.subscriptionId,
      new Subscription(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Subscription with id ${req.params.subscriptionId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Subscription with id " + req.params.subscriptionId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Subscription with the specified subscriptionId in the request
exports.delete = (req, res) => {
  Subscription.remove(req.params.subscriptionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Subscription with id ${req.params.subscriptionId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Subscription with id " + req.params.subscriptionId
        });
      }
    } else res.send({ message: `Subscription was deleted successfully!` });
  });
};

// Delete all Subscriptions from the database.
exports.deleteAll = (req, res) => {
    Subscription.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all subscriptions."
        });
      else res.send({ message: `All Subscriptions were deleted successfully!` });
    });
  };