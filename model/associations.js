const Article = require("./Article")
const Category = require("./Category")
const File = require("./File")

const applyAssociations = () => {
  Category.hasMany(Article, { foreignKey: "categoryId", as: "articles", onDelete: "SET NULL", })
  Article.belongsTo(Category, { foreignKey: "categoryId", as: "category", })
  Article.belongsTo(File, { foreignKey: "heroImageId", as: "heroImage", })
}

module.exports = applyAssociations