require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.VUE_APP_JWT_KEY);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      res.status(401).json({ error: "Requête non autorisée !" });
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: "Requête non authentifiée !" });
  }
};
