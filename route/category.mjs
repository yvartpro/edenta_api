import express from "express"
const router = express.Router()
import db from "../model/index.mjs"

const Category = db.Category

router.get("/", (req, res) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.get("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.post("/", (req, res) => {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.put("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then(category => {
      category.update(req.body)
        .then(category => res.json(category))
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

router.delete("/:id", (req, res) => {
  Category.findByPk(req.params.id)
    .then(category => {
      category.destroy()
        .then(category => res.json(category))
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

export default router