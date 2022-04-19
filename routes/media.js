const router = require("express").Router()
const Media = require("../controllers/Media")
const verify_token = require("../middlewares/verifyToken")
const Uploader = require("../utils/Uploader")


router.post("/upload_single", verify_token, Uploader.single("image"), Media.uploadSingle)
// router.post("/upload_multiple/:folder", verify_token, Media.uploadMultiple)
router.post("/delete", verify_token, Media.remove)
// router.post("/delete_multiple", verify_token, Media.removeMultiple)


module.exports = router