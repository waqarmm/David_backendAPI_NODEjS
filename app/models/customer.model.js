const sql = require("./db.js");

// constructor
const Chef = function (Chef) {
  this.name = Chef.name;
  this.phone_number = Chef.phone_number;
  this.address = Chef.address;
  this.cuisine_type = Chef.cuisine_type;
};

Chef.create = (newChef, result) => {
  sql.query("INSERT INTO Chef SET ?", newChef, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Chef: ", { id: res.insertId, ...newChef });
    result(null, { id: res.insertId, ...newChef });
  });
};

Chef.findById = (ChefId, result) => {
  sql.query(`SELECT * FROM Chef WHERE id = ${ChefId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Chef: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Chef with the id
    result({ kind: "not_found" }, null);
  });
};

Chef.getAll = (result) => {
  sql.query("SELECT * FROM Chef", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Chefs: ", res);
    result(null, res);
  });
};

Chef.updateById = (id, Chef, result) => {
  sql.query(
    "UPDATE Chef SET phone_number = ?, name = ?, address = ? WHERE id = ?",
    [Chef.phone_number, Chef.name, Chef.address, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Chef with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Chef: ", { id: id, ...Chef });
      result(null, { id: id, ...Chef });
    }
  );
};

Chef.remove = (id, result) => {
  sql.query("DELETE FROM Chefs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Chef with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Chef with id: ", id);
    result(null, res);
  });
};

Chef.removeAll = (result) => {
  sql.query("DELETE FROM Chefs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Chefs`);
    result(null, res);
  });
};

module.exports = Chef;
