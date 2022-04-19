require("dotenv").config()

const express = require("express")
const cors = require("cors")
// const helmet = require("helmet")

const app = express()

app.use(cors())
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//   })
// );

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/images", express.static("public"))

const admin = require("./routes/admin")
const client = require("./routes/client")
const media = require("./routes/media")

app.use("/dev/v1/admin", admin)
app.use("/dev/v1", client)
app.use("/dev/v1/media", media)

module.exports = app
