const router = require("express").Router();
const User = require("../db").import("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


//--------> SignUp

/*router.post('/register', (req, res) => {
  const usercreate = {
      username: req.body.user.username,
      password: req.body.user.password
      
  }
  User.create(usercreate)
  .then(user => res.status(200).json({
      message: `${user.name} was added`,
      user: user
  }))
  .catch(err => res.status(500).json({error: err}))
  
})*/
router.post("/register", (req, res) => {
  User.create({
    username: req.bady.user.username,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "User sucessfully created",
        sessionToken: token,
      });
    }, (createError = (err) => res.send(500, err)))
    .catch((err) => res.status(500).json({ error: err }));
});

//--------> Login

router.post("/login", function (req, res) {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: "User sucessfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "bad gateway" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exists. " });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
