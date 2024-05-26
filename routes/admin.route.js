const express = require ("express");
const { adminController } = require("../controllers/admin.controller");
const router = express();


router.post("/enseignants", adminController.createEnseignant);

router.post("/specialites", adminController.createSpecialite);
router.get("/specialites", adminController.getSpecialites);
router.post("/tests", adminController.createTest);
router.get("/tests", adminController.getTests);

module.exports.adminRouter = router;