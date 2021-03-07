module.exports = app => {
    const subscriptions = require("../controllers/subscription.controller.js");
  
    // Create a new Subscription
    app.post("/subscriptions", subscriptions.create);
  
    // Retrieve all Subscriptions
    app.get("/subscriptions", subscriptions.findAll);
  
    // Retrieve a single Subscription with subscriptionId
    app.get("/subscriptions/:subscriptionId", subscriptions.findOne);
  
    // Update a Subscription with subscriptionId
    app.put("/subscriptions/:subscriptionId", subscriptions.update);
  
    // Delete a Subscription with subscriptionId
    app.delete("/subscriptions/:subscriptionId", subscriptions.delete);
  
    // Delete all Subscriptions
    app.delete("/subscriptions", subscriptions.deleteAll);

    // List all subscriptions for a user
    app.get("/listSubscriptions", subscriptions.findAllByUserId);
  };