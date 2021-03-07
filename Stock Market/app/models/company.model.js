const sql = require("./db.js");

// constructor
const Company = function(company) {
  this.name = company.name;
  this.share_value = company.share_value;
};

Company.create = (newCompany, result) => {
  sql.query("INSERT INTO companys SET ?", newCompany, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created company: ", { id: res.insertId, ...newCompany });
    result(null, { id: res.insertId, ...newCompany });
  });
};

Company.findById = (companyId, result) => {
  sql.query(`SELECT * FROM companys WHERE id = ${companyId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found company: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Company with the id
    result({ kind: "not_found" }, null);
  });
};

Company.getAll = result => {
  sql.query("SELECT * FROM companys", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("companys: ", res);
    result(null, res);
  });
};

Company.updateById = (id, company, result) => {
  sql.query(
    "UPDATE companys SET name = ?, share_value = ? WHERE id = ?",
    [company.name, company.share_value, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Company with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated company: ", { id: id, ...company });
      result(null, { id: id, ...company });
    }
  );
};

Company.remove = (id, result) => {
  sql.query("DELETE FROM companys WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Company with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted company with id: ", id);
    result(null, res);
  });
};

Company.removeAll = result => {
  sql.query("DELETE FROM companys", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} companys`);
    result(null, res);
  });
};

module.exports = Company;