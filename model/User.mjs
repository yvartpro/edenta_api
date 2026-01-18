import { DataTypes } from "sequelize"
import bcrypt from "bcrypt"

const UserModel = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "edenta_users",
      timestamps: true,
      paranoid: true,
      hooks: {
        async beforeSave(user) {
          if (user.changed("passwordHash")) {
            user.passwordHash = await bcrypt.hash(user.passwordHash, 10)
          }
        }
      }
    }
  )

  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.passwordHash)
  }

  return User
}

export default UserModel
