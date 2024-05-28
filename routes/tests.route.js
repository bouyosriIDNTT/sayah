const express = require("express");
const router = express.Router();
const {
  getTestScore,
  getTestById,
} = require("../controllers/tests.controller");

router.post("/tests/score", getTestScore);
router.get("/get-test/:specialiteId", getTestById);


module.exports = { testsRouter: router };
