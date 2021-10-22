require("dotenv").config();
const validator = require("validator");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bdd = require("../bdd_config/bdd_connexion");

// Décode le token et récupère le UserID et le niveau d'acces
let decodeToken = function (req) {
  let token = req.headers.authorization.split(" ")[1];
  let decodedToken = jwt.verify(token, process.env.JWT_KEY);
  decodedToken = [decodedToken.userId, decodedToken.admin];
  return decodedToken;
};

// Inscription
exports.signup = (req, res, next) => {
  // Récupération des info de la requête
  const name = req.body.name;
  const firstname = req.body.firstname;
  const email = req.body.email;
  const password = req.body.password;

  // Vérification de la validité de l'adresse mail
  if (validator.isEmail(String(email))) {
    bcrypt.hash(password, 10, (error, hash) => {
      // Préparation de la requête
      let sql =
        "INSERT INTO user (name, firstname, email, password) VALUES (?, ?, ?, ?)";
      let inserts = [name, firstname, email, hash];
      sql = mysql.format(sql, inserts);

      const userSignup = bdd.query(sql, (error, user) => {
        if (!error) {
          res.status(201).json({
            message: "L'utilisateur a été créé avec succès !",
            token: jwt.sign(
              { userId: user.insertId, niveau_acces: 0 },
              process.env.JWT_KEY,
              { expiresIn: process.env.JWT_EXPIRATION }
            ),
          });
        } else {
          return res
            .status(409)
            .json({ error: "Cet utilisateur existe déjà !" });
        }
      });
    });
  } else {
    return res.status(400).json({ error: "Votre email est invalide !" });
  }
};

// Connexion
exports.login = (req, res, next) => {
  // Récupération des info de la requête
  const email = req.body.email;
  const password = req.body.password;

  // Vérification de la validité de l'adresse mail
  if (validator.isEmail(String(email))) {
    // Préparation de la requête
    let sql = "SELECT id, email, password, admin FROM user WHERE email = ?";
    let inserts = [email];
    sql = mysql.format(sql, inserts);

    const userLogin = bdd.query(sql, (error, user) => {
      // email invalide
      if (error) {
        return res.status(400).json({ error: "Votre email est invalide !" });
      }
      // email null
      if (user.length === 0) {
        res
          .status(400)
          .json({ error: "Une erreur est survenue, utilisateur non trouvé !" });
      }

      bcrypt.compare(password, user[0].mot_de_passe).then((valid) => {
        if (!valid) {
          // Les deux mots de passes ne correspondent pas
          return res.status(400).json({ error: "Mot de passe invalide !" });
        }
        // Les mots de passe correspondent
        res.status(200).json({
          message: "Vous êtes désormais connecté !",
          token: jwt.sign(
            { userId: user[0].id, admin: user[0].admin },
            process.env.JWT_KEY,
            { expiresIn: process.env.JWT_EXPIRATION }
          ),
        });
      });
    });
  }
};

// Récuparetion des infos d'un utilisateur
exports.getOneUser = (req, res, next) => {
  const tokenInfos = decodeToken(req);
  const userId = tokenInfos[0];

  if (userId === Number(req.params.id)) {
    let sql = "SELECT name, firstname, email FROM user WHERE id = ?";
    let inserts = [userId];
    sql = mysql.format(sql, inserts);

    const userGetInfos = bdd.query(sql, (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ error: "Une erreur est survenue, utilisateur non trouvé !" });
      }
      if (result.length === 0) {
        res
          .status(400)
          .json({ error: "Une erreur est survenue, utilisateur non trouvé !" });
      } else {
        res.status(200).json(result[0]);
      }
    });
  } else {
    res.status(401).json({ error: "Action non autorisée !" });
  }
};

// Modifications des infos d'un utilisateur
exports.updateOneUser = (req, res, next) => {
  const tokenInfos = decodeToken(req);
  const userId = tokenInfos[0];

  const password = req.body.password;
  const newpassword = req.body.newpassword;

  let sql = "SELECT password FROM user WHERE id = ?";
  let inserts = [userId];
  sql = mysql.format(sql, inserts);

  const userGetPassword = bdd.query(sql, (error, result) => {
    if (error) {
      res.status(400).json({
        error: "Une erreur est survenue, utilisateur non trouvé !",
      });
    }
    if (result.length === 0) {
      res.status(400).json({
        error: "Une erreur est survenue, utilisateur non trouvé !",
      });
    } else {
      bcrypt.compare(password, result[0].mot_de_passe).then((valid) => {
        if (!valid) {
          // Les deux mots de passes ne correspondent pas
          res.status(400).json({ error: "Mot de passe actuel invalide !" });
          // Les deux mots de passes correspondent
        } else {
          bcrypt.hash(newpassword, 10, (error, hash) => {
            let sql = "UPDATE user SET password = ? WHERE id = ?";
            let inserts = [hash, userId];
            sql = mysql.format(sql, inserts);

            const userUpdatePassword = bdd.query(
              sql,
              (error, result) => {
                if (error) {
                  res.status(400).json({
                    error:
                      "La mise à jour des informations de l'utilisateur a échoué",
                  });
                } else {
                  res.status(200).json({
                    message:
                      "Informations de l'utilisateur mis à jour avec succès !",
                  });
                }
              }
            );
          });
        }
      });
    }
  });
};

// Suppression d'un utilisateur
exports.deleteOneUser = (req, res, next) => {
  const tokenInfos = decodeToken(req);
  const userId = tokenInfos[0];

  if (userId === Number(req.params.id)) {
    let sql = "DELETE FROM user WHERE id = ? ";
    let inserts = [userId];
    sql = mysql.format(sql, inserts);

    const userDelete = bdd.query(sql, (error, result) => {
      if (error) {
        res
          .status(400)
          .json({ error: "Une erreur est survenue, utilisateur non trouvé !" });
      } else {
        res.status(200).json({ message: "Utilisateur supprimé avec succès !" });
      }
    });
  } else {
    res.status(400).json({ error: "Action non autorisée !" });
  }
};
