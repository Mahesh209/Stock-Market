const Share = require("../models/share.model.js");

// Create and Save a new Share
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Share
    const share = new Share({
      userId: req.body.userId,
      companyId: req.body.companyId
    });
  
    // Save Share in the database
    Share.create(share, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Share."
        });
      else res.send(data);
    });
  };

// Create and Save a new Share
exports.createShares = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Share
  const share = new Share({
    companyId: req.body.companyId
  });
  var number_of_shares = req.body.number_of_shares;

  for (var i=0; i < number_of_shares; i++) {
    // Save Share in the database
    Share.create(share, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Share."
        });
      else res.send(data);
    });
  }
};

// Retrieve all Shares from the database.
exports.findAll = (req, res) => {
    Share.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving shares."
        });
      else res.send(data);
    });
  };

// Retrieve all Shares from the database.
exports.findAllByUserId = (req, res) => {
  Share.getAllByUserId((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shares."
      });
    else res.send(data);
  });
};

// Retrieve all Shares from the database with companyId.
exports.findAllByCompanyId = (req, res) => {
  Share.getAllByCompanyId((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving shares."
      });
    else {
      res.send(data);
      let number_of_shares = req.body.number_of_shares;
      let userId = req.body.userId;
      for (i = 0; i < number_of_shares; i++) {
        data[i].userId = userId;
        Share.updateById(data[i].id, data[i], (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Share with id ${req.params.shareId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Share with id " + req.params.shareId
              });
            }
          } else res.send(data);
        });
      }
    }
  });
};

// Find a single Share with a shareId
exports.findOne = (req, res) => {
    Share.findById(req.params.shareId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Share with id ${req.params.shareId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Share with id " + req.params.shareId
          });
        }
      } else res.send(data);
    });
  };

  // Find a single Share with a userId and companyId
exports.login = (req, res) => {
  Share.loginShare(req.body.userId, req.body.companyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `userId or companyId are invalid.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Share, please try again"
        });
      }
    } else {
      req.session.shareId = data;
      res.redirect("/home");
    }});
    
};

// Update a Share identified by the shareId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Share.updateById(
      req.params.shareId,
      new Share(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Share with id ${req.params.shareId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Share with id " + req.params.shareId
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Share with the specified shareId in the request
exports.delete = (req, res) => {
  Share.remove(req.params.shareId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Share with id ${req.params.shareId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Share with id " + req.params.shareId
        });
      }
    } else res.send({ message: `Share was deleted successfully!` });
  });
};

// Delete all Shares from the database.
exports.deleteAll = (req, res) => {
    Share.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all shares."
        });
      else res.send({ message: `All Shares were deleted successfully!` });
    });
  };