// models/Category.js
const { DataTypes } = require("sequelize");
const sequelize = require("./index");

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
    validate: {
      nameUnique: (next) => {
        Category.findOne({ where: { name: this.name } }).then((category) => {
          if (category) {
            return next(new Error("Category name already exists"));
          }
          next();
        });
      },
    },
    hooks: {
      beforeSave: () => {
        if (this.name) {
          this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
        }
      },
    },
    instanceMethods: {
      validName() {
        return this.name.length > 0 && this.name.length < 255;
      },
    },
    classMethods: {
      validName(name) {
        return name.length > 0 && name.length < 255;
      },
    },
  }
);

module.exports = Category;
