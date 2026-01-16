import express from "express"
const router = express.Router()
import db from "../model"

const User = db.User

router.get("/", (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.post("/", (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.put("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.update(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

router.delete("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.destroy()
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})
export default router