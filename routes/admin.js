const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/verifyToken")

const { Admin } = require("../controllers")

// Admin
router.post("/auth/login", Admin.login)
router.post("/auth/register", Admin.generate)
router.post("/auth/refresh", Admin.refresh)

module.exports = router
