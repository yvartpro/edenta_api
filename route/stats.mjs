import express from "express";
const router = express.Router();
import db from "../model/index.mjs";
import isAuth from "../middleware/auth.mjs";

const { Article, Category, File, Sequelize } = db;

router.get("/", isAuth, async (req, res) => {
  try {
    const totalArticles = await Article.count();
    const totalCategories = await Category.count();
    const totalFiles = await File.count();

    const totalViews = await Article.sum("view_count") || 0;

    const topArticles = await Article.findAll({
      attributes: ["id", "title", "slug", "view_count"],
      order: [["view_count", "DESC"]],
      limit: 3,
    });

    res.json({
      totals: {
        articles: totalArticles,
        categories: totalCategories,
        files: totalFiles,
        views: totalViews,
      },
      topArticles,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
