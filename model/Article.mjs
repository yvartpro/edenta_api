import { DataTypes } from "sequelize"



export default (sequelize) => {
  const extractFileIds = (data, ids = new Set()) => {
    if (!data) return ids
    if (Array.isArray(data)) {
      data.forEach(item => extractFileIds(item, ids))
    } else if (typeof data === 'object') {
      for (const key in data) {
        if (/^(file|image)(_)?id$/i.test(key) && data[key]) {
          ids.add(data[key])
        }
        extractFileIds(data[key], ids)
      }
    }
    return ids
  }

  const syncContentFiles = async (article) => {
    try {
      const ids = extractFileIds(article.content)
      if (article.heroImageId) ids.add(article.heroImageId)

      // Convert Set to Array and sync
      await article.setContentFiles(Array.from(ids))
    } catch (error) {
      console.error("Error syncing article files:", error)
    }
  }

  const Article = sequelize.define("Article",
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING, allowNull: false },
      subtitle: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      view_count: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
      summary: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
      heroImageId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, defaultValue: null },
      categoryId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true, defaultValue: null },
      status: { type: DataTypes.ENUM("draft", "published"), defaultValue: "draft" },
      content: { type: DataTypes.JSON, allowNull: false, defaultValue: { sections: [] } },
    },
    {
      tableName: "edenta_articles", timestamps: true, paranoid: true,
      validate: {
        slugUnique(next) {
          Article.findOne({ where: { slug: this.slug } }).then((article) => {
            if (article && article.id !== this.id) {
              return next(new Error("Article slug already exists"))
            }
            next()
          })
        },
      },
      hooks: {
        afterCreate: syncContentFiles,
        afterUpdate: syncContentFiles
      }
    }
  )
  return Article
}