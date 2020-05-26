const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid, allFields } = require("../users/users-service.js");

router.post('/register', (req, res) => {
    const credentials = req.body;

  if (allFields(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "Missing one or more from username, password, email, name, busiess name, and terms",
    });
  }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (isValid(req.body)) {
      Users.findBy({ username: username })
        .then(([user]) => {
          // compare the password the hash stored in the database
          if (user && bcryptjs.compareSync(password, user.password)) {
            // produce and send a token that includes the username and the role of the user
            const token = createToken(user);
  
            res.status(200).json({ message: "Welcome to our API", token });
          } else {
            res.status(401).json({ message: "You shall not pass!" });
          }
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({
        message: "please provide username and password",
      });
    }
});

  
function createToken(user) {
    const payload = {
      sub: user.id,
      username: user.username
    };
  
    const secret = process.env.JWT_SECRET || "keepitsecret,keepitsafe!";
  
    const options = {
      expiresIn: "1d"
    };
  
    return jwt.sign(payload, secret, options);
  }

  router.get("/logout", (req, res) => {
    if (req.jwt) {
     req.jwt.destroy(err => {
        if (err) {
          res.status(500).json({ message: "unable to log out" });
        } else {
          res.status(204).end();
        }
      });
    } else {
      res.status(204).end();
    }
  });
  
module.exports = router;