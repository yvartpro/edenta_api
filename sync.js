// sync.js
const sequelize = require("./models");
require("./models/Article");
require("./models/File");
// require("./models/User");

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synced");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
