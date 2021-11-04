const mysql = require("mysql");
const bdd = mysql.createPool({
  // TODO
  host: process.env.SQL_BDD_HOST,
  user: process.env.SQL_BDD_USER,
  password: process.env.SQL_BDD_PASSWORD,
  database: process.env.SQL_BDD_NAME,
});

// Test de la connexion avec la base de données
bdd.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) {
    return console.error("error: " + error.message);
  }
  console.log("Connexion à la base de données MySQL validée !");
});

module.exports = bdd;
