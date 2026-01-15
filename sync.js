// sync.js
const sequelize = require("./models");
const Category = require("./models/Category");
const Article = require("./models/Article");
const File = require("./models/File");
require("./models/associations")();

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("DB synced");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
