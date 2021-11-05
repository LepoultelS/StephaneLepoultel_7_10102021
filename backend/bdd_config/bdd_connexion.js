const mysql = require("mysql");
const bdd = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWD,
  database: process.env.DB_NAME,
});

// Test de la connexion avec la base de données
bdd.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) {
    return console.error("error: " + error.message);
  }
  console.log("Connexion à la base de données MySQL validée !");
});

module.exports = bdd;
