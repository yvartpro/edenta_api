require("dotenv").config()
const express = require("express")
const cors = require("cors")

const sequelize = require("./models")
const applyAssociations = require("./models/associations")

require("./models/Category")
require("./models/Article")
require("./models/File")

applyAssociations()

const app = express()

/**
 * MIDDLEWARE */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * HEALTH CHECK */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    name: "Edenta Blog API",
  })
})

/**
 * ROUTES */
const categoryRouter = require("./routes/category")
const articleRouter = require("./routes/article")
const fileRouter = require("./routes/file")

app.use("/api/category", categoryRouter)
app.use("/api/article", articleRouter)
app.use("/api/file", fileRouter)

/**
 * ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    message: "Internal server error",
  })
})

/** START SERVER */
const PORT = process.env.PORT || 4000

  (async () => {
    try {
      await sequelize.authenticate()
      console.log("✅ Database connected")

      await sequelize.sync()
      console.log("✅ Models synced")

      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`)
      })
    } catch (err) {
      console.error("❌ Startup error:", err)
    }
  })()
