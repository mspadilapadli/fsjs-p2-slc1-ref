const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/groceries", Controller.getGroceries);
router.post("/groceries", Controller.postGroceries);

// router.use(authorization);
router.put("/groceries/:id", authorization, Controller.putGroceries);
router.delete("/groceries/:id", authorization, Controller.deleteGroceries);

module.exports = router;
