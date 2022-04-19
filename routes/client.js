const express = require("express")
const router = express.Router()

const { Menu } = require("../controllers")

//Menu
router.post("/menu", verifyToken, Menu.create)
router.get("/menu", verifyToken, Menu.index)
router.get("/menu/list", verifyToken, Menu.list)
router.get("/menu/:id", verifyToken, Menu.show)
router.put("/menu/:id", verifyToken, Menu.update)
router.delete("/menu/:id", verifyToken, Menu.delete)

router.post("/auth/login", Client.login)
router.post("/auth/register", Client.generate)
router.post("/auth/refresh", Client.refresh)

module.exports = router
