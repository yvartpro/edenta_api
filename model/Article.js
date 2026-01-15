// models/Article.js
const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Article = sequelize.define("Article", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

  title: { type: DataTypes.STRING, allowNull: false },

  subtitle: { type: DataTypes.STRING, allowNull: true, defaultValue: null },

  slug: { type: DataTypes.STRING, allowNull: false, unique: true },

  summary: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },

  heroImageId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, defaultValue: null },

  category: { type: DataTypes.STRING, allowNull: false },

  status: { type: DataTypes.ENUM("draft", "published"), defaultValue: "draft" },

  content: { type: DataTypes.JSON, allowNull: false, defaultValue: { sections: [] } },
}, { tableName: "articles", timestamps: true, paranoid: true });

module.exports = Article;
