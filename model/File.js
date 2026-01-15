// models/File.js
const { DataTypes } = require("sequelize")
const sequelize = require("./index")

const File = sequelize.define(
  "File",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    url: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("image", "video"), defaultValue: "image" },
    alt: { type: DataTypes.STRING },
  },
  { tableName: "files", timestamps: true, paranoid: true }
)

module.exports = File
