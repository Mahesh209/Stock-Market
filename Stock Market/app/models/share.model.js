const sql = require("./db.js");

// constructor
const Shares = function(shares) {
  this.userId = shares.userId;
  this.companyId = shares.companyId;
};

Shares.create = (newShares, result) => {
  sql.query("INSERT INTO shares SET ?", newShares, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created shares: ", { id: res.insertId, ...newShares });
    result(null, { id: res.insertId, ...newShares });
  });
};

Shares.findById = (sharesId, result) => {
  sql.query(`SELECT * FROM shares WHERE id = ${sharesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shares: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Shares with the id
    result({ kind: "not_found" }, null);
  });
};


Shares.getAll = result => {
  sql.query("SELECT * FROM shares", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("shares: ", res);
    result(null, res);
  });
};

Shares.getAllByCompanyId = result => {
  sql.query(`SELECT * FROM shares WHERE companyId = ${companyId} and for_sale = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("shares: ", res);
    result(null, res);
  });
};

Shares.getAllByUserId = result => {
  sql.query(`SELECT * FROM shares WHERE userId = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("shares: ", res);
    result(null, res);
  });
};

Shares.updateById = (id, shares, result) => {
  sql.query(
    "UPDATE shares SET userId = ?, companyId = ? WHERE id = ?",
    [shares.userId, shares.companyId, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Shares with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated shares: ", { id: id, ...shares });
      result(null, { id: id, ...shares });
    }
  );
};

Shares.remove = (id, result) => {
  sql.query("DELETE FROM shares WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Shares with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted shares with id: ", id);
    result(null, res);
  });
};

Shares.removeAll = result => {
  sql.query("DELETE FROM shares", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} shares`);
    result(null, res);
  });
};

module.exports = Shares;