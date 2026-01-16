import express from "express"
const router = express.Router()
import db from "../model/index.mjs"

const Category = db.Category

router.get("/", (req, res) => {
  const { page = 1, limit = 15, search = "" } = req.query;
  const offset = (page - 1) * limit;
  const { Op } = db.Sequelize;

  const where = search ? {
    [Op.or]: [
      { name: { [Op.like]: `%${search}%` } },
      { slug: { [Op.like]: `%${search}%` } }
    ]
  } : {};

  Category.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['name', 'ASC']]
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