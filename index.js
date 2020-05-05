const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MONGO_URI, JWT_SECRET} = require('./config/keys');
const PORT = process.env.PORT || 8080;
const User = require('./user');

app.use(bodyParser.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch(err => console.log(err));

mongoose.connection.on("connected", () => {
    console.log("connected to database!!!");
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({
      error: "please add all the fields."
    });
  }
  User.findOne({ email: email })
    .then(saveUser => {
      if (saveUser)
        return res.status(422).json({
          error: "Email already registered."
        });

      bcrypt
        .hash(password, 12)
        .then(hashPassword => {
          const user = new User({
            email,
            password: hashPassword,
            name
          });
          user
            .save()
            .then(user => {
              res.json({ message: "user saved successfully" });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: "Something went wrong!"})
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: "Something went wrong!"})
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({error: "Something went wrong!"})
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({
      error: "please add all the fields."
    });

  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser)
        return res.status(422).json({
          error: "Invalid Email or Password."
        });

      bcrypt
        .compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email } = savedUser;
            res.json({
              message: "Successfully signed in!!!",
              token,
              user: {_id, name, email}
            });
          } else {
            return res
              .status(422)
              .json({ error: "Invalid Email or Password." });
          }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({error: "Something went wrong!"})
        });
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({error: "Something went wrong!"})
    });
});


if(process.env.NODE_ENV == "production"){
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  });
}


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});


