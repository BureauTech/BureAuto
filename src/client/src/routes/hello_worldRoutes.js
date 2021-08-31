const express = require("express")
const router = express.Router()

//Mapeado em hello_world

router.get("/", function (req, res) {
  res.render("hello_world/hello_world")
})

module.exports = router