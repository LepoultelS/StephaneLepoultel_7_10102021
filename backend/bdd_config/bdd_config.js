require("dotenv").config();
const mysql = require("mysql");

// Paramètres de connexion au serveur MySQL pour la création de la base de données
const mysqlConnexion = mysql.createConnection({
  host: process.env.SQL_BDD_HOST,
  user: process.env.SQL_BDD_USER,
  password: process.env.SQL_BDD_PASSWORD,
});

// Paramètres de connexion au serveur MySQL pour la création des tables
const bdd = mysql.createConnection({
  host: process.env.SQL_BDD_HOST,
  user: process.env.SQL_BDD_USER,
  password: process.env.SQL_BDD_PASSWORD,
  database: process.env.SQL_BDD_NAME,
});

// Base de données
const database = `CREATE DATABASE ${process.env.SQL_BDD_NAME};`;

// Table des utilisateurs
const tableUsers =
  "CREATE TABLE `user` ( `id` int PRIMARY KEY AUTO_INCREMENT, `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP), `name` varchar(30) DEFAULT NULL, `firstname` varchar(30) DEFAULT NULL, `email` varchar(60) NOT NULL UNIQUE, `password` varchar(100) NOT NULL, `admin` int DEFAULT NULL ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;";

// Table des posts
const tablePosts =
  "CREATE TABLE `post` ( `id` int AUTO_INCREMENT, `user_id` int NOT NULL, `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP), `tag` varchar(30) DEFAULT NULL, `title` text NOT NULL, `description` text NOT NULL, PRIMARY KEY (`id`,`user_id`), CONSTRAINT `fk_post_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;";

// Table des commentaires
const tableComments =
  "CREATE TABLE `comment` ( `id` int AUTO_INCREMENT, `user_id` int NOT NULL, `post_id` int NOT NULL, `creation_date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP), `message` text NOT NULL, PRIMARY KEY (`id`, `user_id`, `post_id`), CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_comment_post_id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1;";

// Création d'une fonction pour séquencer nos différentes création de table
const queryCustom = function (query) {
  return new Promise((resolve, reject) => {
    try {
      bdd.query(query, function (err, results, fields) {
        if (err) {
          return console.error("error: " + err.message);
        }
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Création d'une fonction pour la crétion de notre base de données
const bddCreation = function () {
  return new Promise((resolve, reject) => {
    try {
      mysqlConnexion.connect(function (err) {
        // Connexion au serveur MySQL
        if (err) throw err;
        console.log("-");
        console.log(
          "-------------------------  Début de la configuration -------------------------"
        );
        console.log("-");
        console.log(
          "La configuration de la base de données est en cours... Veuillez patienter..."
        );
        console.log("-");
        console.log("Connexion au serveur MySQL validé.");
        console.log("-");
        mysqlConnexion.query(database, function (err, result) {
          // Création de la base de données
          if (err) {
            return console.error("error: " + err.message);
          }
          console.log(
            `La base de données "${process.env.SQL_BDD_NAME}" a été créée avec succès !`
          );
          console.log("-");
          resolve(true);
        });
      });
    } catch (err) {
      reject(err);
    }
  });
};

// Fonction qui initialise la configuration globale de la base de données
const launchDatabaseConfig = function () {
  const asyncFunction = async function () {
    // Attente de la création de la base de données
    await bddCreation();

    bdd.connect(async function (err) {
      if (err) {
        return console.error("error: " + err.message);
      }
      try {
        // Attente de la création de la table des utilisateurs
        await queryCustom(tableUsers);
        console.log(`La table "user" a été créée avec succès !`);
        console.log("-");

        // Attente de la création de la table des posts
        await queryCustom(tablePosts);
        console.log(`La table "post" a été créée avec succès !`);
        console.log("-");

        // Attente de la création de la table des commentaires
        await queryCustom(tableComments);
        console.log(`La table "comment" a été créée avec succès !`);
        console.log("-");

        console.log("Votre base de données a bien été configurée");
        console.log("-");
        console.log(
          "-------------------------  Fin de la configuration -------------------------"
        );
        console.log("-");
        process.exit();
      } catch (err) {
        console.error("error: " + err.message);
      }
    });
  };
  asyncFunction(); // Appel de la fonction asynchrone
};
launchDatabaseConfig(); // Appel de la fonction globale
