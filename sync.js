const sequelize = require("./model")

require("./model/Category")
require("./model/Article")
require("./model/File")

require("./model/associations")();

(async () => sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized")
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  }))()
