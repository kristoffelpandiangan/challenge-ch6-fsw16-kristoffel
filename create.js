// const { tbl_user } = require("./models");
const { tbl_bio } = require("./models");
// const tbl_user = require("./models/tbl_user");

// Adsand.create({
//     username: "admin_test",
//     password: "admintest123"
// }).then((adsand) => console.log(adsand))

// tbl_user.create({
//     username: "admin_test",
//     password: "admintest123"
// }).then((tbl_user) => console.log(tbl_user))


tbl_bio.create({
    username: "admin_test",
    password: "admintest123",
    email: "admin@gmail.com",
    fullname: "admin ganteng"
}).then((tbl_bio) => console.log(tbl_bio))