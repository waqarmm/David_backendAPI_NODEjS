module.exports = (app) => {
  const chef = require("../controllers/customer.controller.js");

  // Create a new chef
  app.post("/chef", chef.create);

  // Retrieve all Customers
  app.get("/chef", chef.findAll);

  // Retrieve a single chef with customerId
  app.get("/chef/:customerId", chef.findOne);

  // Update a chef with customerId
  app.put("/chef/:customerId", chef.update);

  // Delete a chef with customerId
  app.delete("/chef/:customerId", chef.delete);

  // Create a new chef
  app.delete("/customers", chef.deleteAll);
};
