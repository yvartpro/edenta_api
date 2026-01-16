import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ArticleFile = sequelize.define("ArticleFile", {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
    articleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, references: { model: "articles", key: "id" } },
    fileId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, references: { model: "files", key: "id" } },
  }, {
    tableName: "edenta_article_files",
    timestamps: false,
    paranoid: true,
  })

  return ArticleFile
}
