import "dotenv/config"
import cors from "cors"
import express from "express"

import articleRouter from "./route/article.mjs"
import categoryRouter from "./route/category.mjs"
import fileRouter from "./route/file.mjs"

import { sequelize } from "./model/index.mjs"

const app = express()

/** MIDDLEWARE */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("Welcome to EDENTA Application")
})

/** ROUTES */
app.use("/api/category", categoryRouter)
app.use("/api/article", articleRouter)
app.use("/api/file", fileRouter)

/** ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: "Internal server error" })
})

/** START SERVER */
const PORT = process.env.PORT

try {
  await sequelize.authenticate()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
} catch (err) {
  console.error("❌ DB connection failed:", err)
}