const Article = require("./Article")
const Category = require("./Category")
const File = require("./File")

const applyAssociations = () => {
    Category.hasMany(Article, { foreignKey: "categoryId", as: "articles" })

    Article.belongsTo(Category, { foreignKey: "categoryId", as: "category" })

    Article.belongsTo(File, { foreignKey: "heroImageId", as: "heroImage" })

    File.hasMany(Article, { foreignKey: "heroImageId", as: "articles" })
}

module.exports = applyAssociations
