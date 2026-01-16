import { Sequelize } from "sequelize";
import "dotenv/config";
import CategoryModel from "./Category.mjs";
import ArticleModel from "./Article.mjs";
import FileModel from "./File.mjs";
import applyAssociations from "./associations.mjs";

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST || "localhost",
        dialect: process.env.DATABASE_DIALECT || "mysql",
        logging: false,
    }
);

// Initialize models
const Category = CategoryModel(sequelize);
const Article = ArticleModel(sequelize);
const File = FileModel(sequelize);

// Apply associations
applyAssociations({ Category, Article, File });

const db = { sequelize, Sequelize, Category, Article, File };
export { sequelize, Sequelize, Category, Article, File };
export default db;
