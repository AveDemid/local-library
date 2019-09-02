var express = require("express");
var router = express.Router();

router.get("/hello-world", (req, res) => {
  res.send("Hello world");
});

module.exports = router;
