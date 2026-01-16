
export default ({ Category, Article, File, ArticleFile }) => {
  Category.hasMany(Article, { foreignKey: "categoryId", as: "articles", onDelete: "SET NULL" })
  Article.belongsTo(Category, { foreignKey: "categoryId", as: "category" })

  File.hasMany(Article, { foreignKey: "heroImageId", as: "articles", onDelete: "SET NULL" })
  Article.belongsTo(File, { foreignKey: "heroImageId", as: "heroImage", })

  Article.belongsToMany(File, { through: ArticleFile, as: 'contentFiles', foreignKey: 'articleId', otherKey: 'fileId' })
  File.belongsToMany(Article, { through: ArticleFile, as: 'inContentArticles', foreignKey: 'fileId', otherKey: 'articleId' })
}
