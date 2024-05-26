const express = require ("express");
const router = express.Router();
const { superAdminController } = require("../controllers/superAdmin.controller");


router.post("/creat", superAdminController.createAdmin);
router.get("/consult", superAdminController.getAdmin);
router.put("/modifier", superAdminController.updateAdmin);
router.delete("/supp", superAdminController.deleteAdmin);

module.exports.superAdminRouter = router;