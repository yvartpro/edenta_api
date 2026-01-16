import { DataTypes } from "sequelize"

export default (sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

      name: { type: DataTypes.STRING, allowNull: false, unique: true },

      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      tableName: "categories",
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeValidate(category) {
          if (category.name && !category.slug) {
            category.slug = category.name.toLowerCase().trim().replace(/\s+/g, "-");
          }
        },
      },
    }
  );

  return Category;
};