const express = require("express");
const path = require("path");

const upload = require("../middlewares/multer");

const indexController = require("../controllers/index.controller");

const router = express.Router();

router.get("/", indexController.getIndexController);

router.post("/", upload.single("file"), indexController.postIndexController);

module.exports = router;
