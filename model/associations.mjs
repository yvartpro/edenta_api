

export default ({ Category, Article, File }) => {
  Category.hasMany(Article, { foreignKey: "categoryId", as: "articles", onDelete: "SET NULL" });

  Article.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

  Article.belongsTo(File, { foreignKey: "heroImageId", as: "heroImage", });
};
