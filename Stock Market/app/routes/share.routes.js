module.exports = app => {
    const shares = require("../controllers/share.controller.js");
  
    // Create a new Share
    app.post("/shares", shares.create);
  
    // Retrieve all Shares
    app.get("/shares", shares.findAll);
  
    // Retrieve a single Share with shareId
    app.get("/shares/:shareId", shares.findOne);
  
    // Update a Share with shareId
    app.put("/shares/:shareId", shares.update);
  
    // Delete a Share with shareId
    app.delete("/shares/:shareId", shares.delete);
  
    // Delete all Shares
    app.delete("/shares", shares.deleteAll);

    // Create company shares with companyId and number of shares
    app.post("/setShares", shares.createShares);

    // Buy shares with companyId given number of shares and userId
    app.post("/buyShares", shares.findAllByCompanyId);

    // List all shares for a user
    app.get("/listShares", shares.findAllByUserId);
  };