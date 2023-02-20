const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  let data = req.body;
  User.findOne({ email: data.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(data.mdp, user.mdp)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ status: 401, error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(401).json({ error }));
};

module.exports.register = async (req, res) => {
  let data = req.body;
  const user = new User({
    email: data.email,
  });
  bcrypt
    .hash(data.mdp, 10)
    .then((hash) => {
      user.mdp = hash;
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.users = async (req, res) => {
  User.find({}, {}, function (err, docs) {
    res.send(docs);
  });
};
module.exports.logout = async (req, res) => {
  // delete token from database
  res.status(200).json(req.auth);
};

module.exports.test = async (req, res) => {
  res.status(200).json({ message: "test" });
};

module.exports.me = async (req, res) => {
  res.status(200).json({ message: "me" });
};
