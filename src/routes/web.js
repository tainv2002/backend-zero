const express = require("express");
const router = express.Router();
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')

router.get("/", homeController.index);

router.post("/users/create", userController.create);
router.get("/users/create", userController.add);

router.post("/users/:id/edit", userController.update);
router.get("/users/:id/edit", userController.edit);

router.post("/users/:id/delete", userController.destroy);
router.get("/users/:id/delete", userController.delete);

module.exports = router;