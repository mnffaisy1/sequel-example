var express = require("express");
var router = express.Router();
const db = require("../models");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // console.log(db);
  const user = await db.User.findOne();
  console.log("🚀 ~ file: users.js:8 ~ router.get ~ users", users);
  res.send("respond with a resource");
});

module.exports = router;
