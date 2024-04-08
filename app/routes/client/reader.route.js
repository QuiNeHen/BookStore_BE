const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/reader.controller");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.post('/register', controller.create)

router.get('/user', controller.getUser)

router.get('/infor', controller.getInfor)


module.exports = router;