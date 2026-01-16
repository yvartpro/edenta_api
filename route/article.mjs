import express from "express"
const router = express.Router()
import db from "../model/index.mjs"

const Article = db.Article
const File = db.File
const Category = db.Category

router.get("/", (req, res) => {
  const { page = 1, limit = 15, search = "" } = req.query;
  const offset = (page - 1) * limit;
  const { Op } = db.Sequelize;

  const where = search ? {
    [Op.or]: [
      { title: { [Op.like]: `%${search}%` } },
      { subtitle: { [Op.like]: `%${search}%` } },
      { slug: { [Op.like]: `%${search}%` } }
    ]
  } : {};

  Article.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']],
    include: [
      { model: File, as: 'heroImage', attributes: ["id", "url", "type", "alt"] },
      { model: Category, as: "category", attributes: ["id", "name"] },
      { model: File, as: 'contentFiles', attributes: ["id", "url", "type", "alt"], through: { attributes: [] } }
    ]
  })
    .then(result => res.json({
      data: result.rows,
      total: result.count,
      page: parseInt(page),
      totalPages: Math.ceil(result.count / limit)
    }))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.get("/:id", (req, res) => {
  Article.findByPk(req.params.id, {
    include: [
      { model: File, as: 'heroImage', attributes: ["id", "url", "type", "alt"] },
      { model: Category, as: "category", attributes: ["id", "name"] },
      { model: File, as: 'contentFiles', attributes: ["id", "url", "type", "alt"], through: { attributes: [] } }
    ]
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
    include: [
      { model: File, as: 'heroImage', attributes: ["id", "url", "type", "alt"] },
      { model: Category, as: "category", attributes: ["id", "name"] },
      { model: File, as: 'contentFiles', attributes: ["id", "url", "type", "alt"], through: { attributes: [] } }
    ]
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