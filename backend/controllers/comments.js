require("dotenv").config();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bdd = require("../bdd_config/bdd_connexion");

// Décode le token et récupère le UserID et le niveau d'acces
let decodeToken = function (req) {
  let token = req.headers.authorization.split(" ")[1];
  let decodedToken = jwt.verify(token, process.env.JWT_KEY);
  decodedToken = [decodedToken.userId, decodedToken.admin];
  return decodedToken;
};

// Création d'un commentaire
exports.commentPost = (req, res, next) => {
  const tokenInfos = decodeToken(req);
  const userId = tokenInfos[0];

  const postId = req.body.postId;
  const message = req.body.message;

  let sql = "INSERT INTO comment (user_id, post_id, message) VALUES (?, ?, ?)";
  let inserts = [userId, postId, message];
  sql = mysql.format(sql, inserts);

  const commentCreate = bdd.query(sql, (error, result) => {
    if (!error) {
      res.status(201).json({ message: "Le commentaire a bien été créé" });
    } else {
      res.status(400).json({
        message: "Une erreur est survenue, le commentaire n'a pas été créé",
      });
    }
  });
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  const tokenInfos = decodeToken(req);
  const userId = tokenInfos[0];
  const admin = tokenInfos[1];

  const commentId = req.params.id;

  // Si l'admin supprime le commentaire
  if (admin === 1) {
    let sql = "DELETE FROM comment WHERE id = ?";
    let inserts = [commentId];
    sql = mysql.format(sql, inserts);

    const commentDeleteAdmin = bdd.query(sql, (error, result) => {
      if (!error) {
        res.status(200).json({
          message: "Le commentaire a été supprimé ! (Modération)",
        });
      } else {
        res.status(400).json({
          message:
            "Une erreur est survenue, le commentaire n'a pas été supprimé",
        });
      }
    });
    // Si l'auteur supprime le commentaire
  } else {
    let sql = "DELETE FROM comment WHERE id = ? AND user_id = ?";
    let inserts = [commentId, userId];
    sql = mysql.format(sql, inserts);

    const commentDeleteUser = bdd.query(sql, (error, result) => {
      if (!error) {
        if (result.affectedRows === 0) {
          res.status(400).json({
            message: "Vous n'êtes pas autorisé à supprimer ce commentaire !",
          });
        } else {
          res.status(200).json({
            message: "Votre commentaire a été supprimé !",
          });
        }
      } else {
        res.status(400).json({
          message:
            "Une erreur est survenue, le commentaire n'a pas été supprimé",
        });
      }
    });
  }
};
