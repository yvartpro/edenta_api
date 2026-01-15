const express = require("express")
const router = express.Router()
const db = require("../model")

const File = db.File

router.get("/", (req, res) => {
  File.findAll()
    .then(files => res.json(files))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.get("/:id", (req, res) => {
  File.findByPk(req.params.id)
    .then(file => res.json(file))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.post("/", (req, res) => {
  File.create(req.body)
    .then(file => res.json(file))
    .catch(err => res.status(500).json({ error: err.message }))
})

router.put("/:id", (req, res) => {
  File.findByPk(req.params.id)
    .then(file => {
      file.update(req.body)
        .then(file => res.json(file))
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

router.delete("/:id", (req, res) => {
  File.findByPk(req.params.id)
    .then(file => {
      file.destroy()
        .then(file => res.json(file))
        .catch(err => res.status(500).json({ error: err.message }))
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

module.exports = router