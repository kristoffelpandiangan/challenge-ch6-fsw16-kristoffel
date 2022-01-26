var express = require("express");
var router = express.Router();
var cookieParser = require('cookie-parser')
const session = require("express-session");
const { tbl_bio } = require("./models");
const { tbl_user } = require("./models");


router.use(function timeLog(req, res, next) {
  console.log("Time:,", Date.now());
  next();
});


router.post("/login", async (req, res) => {
  const{username, password} = req.body
  const userpass = await tbl_user.findOne({where : {username}}).catch((err) => {console.log("error: ", err) })
  
  if(!userpass) {
    res.render("signin2", {
      layout: "./layouts/main-layout",
      title: "Signin",
      signup: "Username or Password does not match!",
    })
  }

  if(userpass.username !== username || userpass.password !== password) {
    res.render("signin2", {
      layout: "./layouts/main-layout",
      title: "Signin",
      signup: "Username or Password does not match!",
    })
  }


  if(userpass) {if (userpass.username === username && userpass.password === password) {
    res.redirect("/projects");
  }}
  else {
    res.render("signin2", {
      layout: "./layouts/main-layout",
      title: "Signin",
      signup: "Username or Password does not match!",
    })
  }
});


router.post('/signup', (req, res) => {
  tbl_bio.create({
   username: req.body.username,
   password: req.body.password,
   email: req.body.email,
   fullname: req.body.name
  }),
  tbl_user.create({
    username: req.body.username,
    password: req.body.password
})
   .then(tbl_bio => {
    res.render("signin", {
      layout: "./layouts/main-layout",
      title: "Signin",
      signup: "SignUp Success! Please Login.",
    })
  })
   .catch(err => {
       res.status(400).json("Cant create bio")})
})

router.post('/update', (req, res) => {
  
  const query = {
    where: { username: req.body.username}
   }
   
  
  tbl_bio.update({
   username: req.body.username,
   password: req.body.password,
   email: req.body.email,
   fullname: req.body.name
  }, query),
  tbl_user.update({
    username: req.body.username,
    password: req.body.password
},  query)
 .then(() => {
  res.render("signin3", {
    layout: "./layouts/main-layout",
    title: "Signin",
    signup: "Update Data Success! Please Login.",
  })
})
 .catch(err => {
  console.error("Gagal mengupdate data!")
 })
})


router.post('/delete', (req, res) => {
  
  const query = {
    where: { username: req.body.username}
   }
   
  
  tbl_user.destroy( query)
 .then(() => {
  res.render("signup3", {
    layout: "./layouts/main-layout",
    title: "signup",
    signup: "Delete User Berhasil!.",
  })
})
 .catch(err => {
  console.error("Gagal mengupdate data!")
 })
})

// router.get("/signup", (req, res) => {
//   res.status(200).json(credential);
// });

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("signin", {
        layout: "./layouts/main-layout",
        title: "SignIn",
        logout: "Logout Success!",
      });
    }
  });
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: "Fail",
    errors: err.message,
  });
});

router.use((req, res, next) => {
  res.status(404).json({
    status: "Fail",
    errors: "Error 404",
  });
});

module.exports = router;
