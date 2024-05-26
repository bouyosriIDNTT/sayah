const express = require("express");
const router = express();
const { groupeController } = require("../controllers/groupe.controller");
const passport = require('passport');
const { roleMiddleware } = require("../middleware/role");
const{inRole, Roles} = roleMiddleware;

router.post("/creation", groupeController.groupCreation);
router.post("/addusertogroupe", groupeController.addUserToGroup);

router.get(
    "/findAllGroupe",
    passport.authenticate("jwt", { session: false }),
    inRole(Roles.ADMIN),
     groupeController.findAllGroupe
     );

router.delete("/deleteGroupe/:id",
passport.authenticate("jwt", { session: false }),
inRole(Roles.ADMIN),
groupeController.deleteGroupe);

module.exports.groupeRouter = router;
