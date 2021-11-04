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

// Création d'un post
exports.createPost = (req, res, next) => {
  const tokenInfos = decodeToken(req);
  const userId = tokenInfos[0];

  const title = req.body.title;
  const description = req.body.description;
  const tag = req.body.tag;

  let sql =
    "INSERT INTO post (user_id, title, description, tag) VALUES (?, ?, ?, ?)";
  let inserts = [userId, title, description, tag];
  sql = mysql.format(sql, inserts);

  const postCreate = bdd.query(sql, (error, post) => {
    if (!error) {
      res.status(201).json({ message: "Post enregistré" });
    } else {
      res.status(400).json({
        message: "Une erreur est survenue, le post n'a pas été créé",
      });
    }
  });
};

// Récupération de tout les posts
exports.getAllPosts = (req, res, next) => {
  let sql = ` SELECT    user.id AS postCreateByUserId,
                        user.name AS postCreateByUserName,
                        user.firstname AS postCreateByUserFirstname,
                        post.id AS postId,
                        post.creation_date AS postCreationDate,
                        post.title AS postTitle,
                        post.description AS postDescription,
                        post.tag AS postTag
              FROM      post
              JOIN      user 
              ON        post.user_id = user.id
              GROUP BY  post.id 
              ORDER BY  postCreationDate DESC`;

  const getPosts = bdd.query(sql, (error, posts) => {
    if (error) {
      res.status(400).json({
        error: "Une erreur est survenue, aucun post trouvé !",
      });
    } else {
      res.status(200).json(posts);
    }
  });
};

// Récuparétion des posts par tag
exports.getPostsByTag = (req, res, next) => {
  const postTag = req.body.tag;

  let sql = ` SELECT    user.id AS postCreateByUserId,
                        user.name AS postCreateByUserName,
                        user.firstname AS postCreateByUserFirstname,
                        post.id AS postId,
                        post.creation_date AS postCreationDate,
                        post.title AS postTitle,
                        post.description AS postDescription,
                        post.tag AS postTag
              FROM      post
              JOIN      user 
              ON        post.user_id = user.id
              WHERE     post.tag = ?
              GROUP BY  post.id 
              ORDER BY  postCreationDate DESC`;

  const inserts = [postTag];
  sql = mysql.format(sql, inserts);

  const getPostsByTag = bdd.query(sql, (error, posts) => {
    if (error) {
      res.status(400).json({
        error: "Une erreur est survenue, aucun post trouvé !",
      });
    } else {
      res.status(200).json(posts);
    }
  });
};

// Récuparétion des posts par utilisateur
exports.getPostsByUser = (req, res, next) => {
  const userId = req.params.id;

  let sql = ` SELECT    user.id AS postCreateByUserId,
                        user.name AS postCreateByUserName,
                        user.firstname AS postCreateByUserFirstname,
                        post.id AS postId,
                        post.creation_date AS postCreationDate,
                        post.title AS postTitle,
                        post.description AS postDescription,
                        post.tag AS postTag
              FROM      post
              JOIN      user 
              ON        post.user_id = user.id
              WHERE     user.id = ?
              GROUP BY  post.id 
              ORDER BY  postCreationDate DESC`;

  const inserts = [userId];
  sql = mysql.format(sql, inserts);

  const getPostsByUser = bdd.query(sql, (error, posts) => {
    if (error) {
      res.status(400).json({
        error: "Une erreur est survenue, aucun post trouvé !",
      });
    } else {
      res.status(200).json(posts);
    }
  });
};

// Récupération d'un post
exports.getOnePost = (req, res, next) => {
  const tokenInfos = decodeToken(req);
  const userId = tokenInfos[0];
  const postId = req.params.id;

  const sqlPost = ` SELECT    user.id AS postCreateByUserId,
                              user.name AS postCreateByUserName,
                              user.firstname AS postCreateByUserFirstname,
                              post.id AS postId,
                              post.creation_date AS postCreationDate,
                              post.title AS postTitle,
                              post.description AS postDescription,
                              post.tag AS postTag
                    FROM      post
                    JOIN      user 
                    ON        post.user_id = user.id
                    WHERE     post.id = ? 
                    GROUP BY  post.id;`;

  const sqlComment = `SELECT    user.id AS commentCreateByUserId,
                                user.name AS commentCreateByUserName,
                                user.firstname AS commentCreateByUserFirstname,

                                comment.id AS commentId,
                                comment.creation_date AS commentCreationDate, 
                                comment.message AS commentMessage
                      FROM      comment
                      JOIN      user 
                      ON        comment.user_id = user.id
                      WHERE     post_id = ?
                      GROUP BY  comment.id 
                      ORDER BY  commentCreationDate DESC;`;

  const firstInserts = [userId, postId];
  const firstSql = mysql.format(sqlPost, firstInserts);

  const secondInserts = [postId];
  const secondSql = mysql.format(sqlComment, secondInserts);

  const getOnePost = bdd.query(firstSql, (error, result) => {
    if (!error) {
      const post = result;
      const getOnePostComments = bdd.query(secondSql, (error, result) => {
        if (!error) {
          const comment = result;
          const finalRes = {
            post: post,
            comment: comment,
          };
          res.status(200).json(finalRes);
        }
      });
    } else {
      console.log(error);
      res.status(400).json({
        error: "Une erreur est survenue, aucun post trouvé !",
      });
    }
  });
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
  const tokenInfos = decodeToken(req);
  const userId = tokenInfos[0];
  const admin = tokenInfos[1];
  const postId = parseInt(req.params.id);

  // Si l'admin supprime le post
  if (admin === 1) {
    let sql = "DELETE FROM post WHERE id = ?;";
    let inserts = [postId];
    sql = mysql.format(sql, inserts);

    const postDeleteAdmin = bdd.query(sql, (error, result) => {
      if (result.affectedRows === 0) {
        res.status(400).json({
          message: "Vous n'êtes pas autorisé à supprimer ce post !",
        });
      } else {
        res.status(200).json({
          message: "Le post a été supprimé ! (Modération)",
        });
      }
    });
    // Si l'auteur supprime le post
  } else {
    let sql = "DELETE FROM post WHERE id = ? AND user_id = ?;";
    let inserts = [postId, userId];
    sql = mysql.format(sql, inserts);

    const postDeleteUser = bdd.query(sql, (error, result) => {
      if (result.affectedRows === 0) {
        res.status(400).json({
          message: "Vous n'êtes pas autorisé à supprimer ce post !",
        });
      } else {
        res.status(200).json({
          message: "Votre post a été supprimé !",
        });
      }
    });
  }
};
