const sql = require("./db.js");

// constructor
const Subscriptions = function(subscriptions) {
  this.userId = subscriptions.userId;
  this.companyId = subscriptions.companyId;
};

Subscriptions.create = (newSubscriptions, result) => {
  sql.query("INSERT INTO subscriptions SET ?", newSubscriptions, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created subscriptions: ", { id: res.insertId, ...newSubscriptions });
    result(null, { id: res.insertId, ...newSubscriptions });
  });
};

Subscriptions.findById = (subscriptionsId, result) => {
  sql.query(`SELECT * FROM subscriptions WHERE id = ${subscriptionsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found subscriptions: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Subscriptions with the id
    result({ kind: "not_found" }, null);
  });
};


Subscriptions.getAll = result => {
  sql.query("SELECT * FROM subscriptions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("subscriptions: ", res);
    result(null, res);
  });
};

Subscriptions.getAllByCompanyId = result => {
  sql.query(`SELECT * FROM subscriptions WHERE companyId = ${companyId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("subscriptions: ", res);
    result(null, res);
  });
};

Subscriptions.getAllByUserId = result => {
  sql.query(`SELECT * FROM subscriptions WHERE userId = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("subscriptions: ", res);
    result(null, res);
  });
};

Subscriptions.updateById = (id, subscriptions, result) => {
  sql.query(
    "UPDATE subscriptions SET userId = ?, companyId = ? WHERE id = ?",
    [subscriptions.userId, subscriptions.companyId, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Subscriptions with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated subscriptions: ", { id: id, ...subscriptions });
      result(null, { id: id, ...subscriptions });
    }
  );
};

Subscriptions.remove = (id, result) => {
  sql.query("DELETE FROM subscriptions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Subscriptions with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted subscriptions with id: ", id);
    result(null, res);
  });
};

Subscriptions.removeAll = result => {
  sql.query("DELETE FROM subscriptions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} subscriptions`);
    result(null, res);
  });
};

module.exports = Subscriptions;