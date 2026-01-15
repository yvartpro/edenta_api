// models/User.js
const { DataTypes } = require("sequelize")
const sequelize = require("./index")
const bcrypt = require("bcrypt")

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user", allowNull: false, validate: { isIn: { args: [["user", "admin"]], msg: "Invalid role" } } },
  },
  {
    tableName: "users",
    timestamps: true,
    paranoid: true,
    validate: {
      emailUnique: function (value, next) {
        User.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return next(new Error("Email already exists"))
          }
          next()
        })
      },
    },
    hooks: {
      beforeSave: function (user) {
        if (user.password) {
          user.passwordHash = bcrypt.hashSync(user.password, 10)
        }
      },
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.passwordHash)
      },
    },
  }
)

module.exports = User
