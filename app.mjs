import "dotenv/config"
import cors from "cors"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import articleRouter from "./route/article.mjs"
import categoryRouter from "./route/category.mjs"
import fileRouter from "./route/file.mjs"
import statsRouter from "./route/stats.mjs"
import userRouter from "./route/user.mjs"

import { sequelize } from "./model/index.mjs"

const app = express()

/** MIDDLEWARE */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/edenta/api/uploads", express.static("uploads"))
app.use("/edenta/api", express.static('public'))

/** ROUTES */
app.use("/edenta/api/category", categoryRouter)
app.use("/edenta/api/article", articleRouter)
app.use("/edenta/api/file", fileRouter)
app.use("/edenta/api/stats", statsRouter)
app.use("/edenta/api/user", userRouter)

// Catch-all for SPA
app.get("/edenta/api/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

/** ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: "Internal server error" })
})

/** START SERVER */
const PORT = process.env.PORT
const APP_URL = process.env.APP_URL

try {
  await sequelize.authenticate()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} at ${APP_URL}`)
  })
} catch (err) {
  console.error("❌ DB connection failed:", err)
}