import express from "express"
const router = express.Router()
import db from "../model/index.mjs"

const Article = db.Article
const File = db.File
const Category = db.Category

router.get("/", (req, res) => {
  Article.findAll({
    include: [File, Category]
  })
    .then(articles => res.json(articles))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.get("/:id", (req, res) => {
  Article.findByPk(req.params.id, {
    include: [File, Category]
  })
    .then(article => res.json(article))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.post("/", (req, res) => {
  Article.create(req.body)
    .then(article => res.json(article))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.put("/:id", (req, res) => {
  Article.findByPk(req.params.id, {
    include: [File, Category]
  })
    .then(article => {
      article.update(req.body)
        .then(article => res.json(article))
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

router.delete("/:id", (req, res) => {
  Article.findByPk(req.params.id)
    .then(article => {
      article.destroy()
        .then(article => res.json(article))
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

export default router