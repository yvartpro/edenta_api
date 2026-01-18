import express from "express"
const router = express.Router()
import db from "../model/index.mjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import isAuth from "../middleware/auth.mjs"

dotenv.config()

const User = db.User

router.get("/", isAuth, (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const offset = (page - 1) * limit
  User.findAll({
    attributes: { exclude: ["passwordHash"] },
    order: [["createdAt", "DESC"]]
  })
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.get("/:id", isAuth, (req, res) => {
  User.findByPk(req.params.id, {
    attributes: { exclude: ["passwordHash"] }
  })
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const exists = await User.findOne({ where: { email } })
    if (exists) return res.status(400).json({ error: "This email is already taken" })
    const newUser = await User.create({ name, email, passwordHash: password })
    const userJSON = newUser.toJSON()

    delete userJSON.passwordHash
    delete userJSON.createdAt
    delete userJSON.updatedAt
    res.status(201).json(userJSON)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ error: "Invalid email or password" })
    const validPassword = await user.validatePassword(password)
    if (!validPassword) return res.status(401).json({ error: "Invalid email or password" })
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

router.patch("/:id", isAuth, (req, res) => {
  User.findByPk(req.params.id, {
    attributes: { exclude: ["passwordHash"] }
  })
    .then(user => {
      user.update(req.body, {
        attributes: { exclude: ["passwordHash"] }
      })
        .then(user => {
          const userJSON = user.toJSON()
          delete userJSON.passwordHash
          delete userJSON.createdAt
          delete userJSON.updatedAt
          res.json(userJSON)
        })
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

router.delete("/:id", isAuth, (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.destroy()
        .then(user => {
          const userJSON = user.toJSON()
          delete userJSON.passwordHash
          delete userJSON.createdAt
          delete userJSON.updatedAt
          res.json(userJSON)
        })
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})
export default router