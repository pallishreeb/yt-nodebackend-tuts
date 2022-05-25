const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    pool: { max: 5, min: 0, idle: 10000 },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync().then(() => {
  console.log("all re sync");
});

db.users = require("./users")(sequelize, DataTypes);
db.posts = require("./posts")(sequelize, DataTypes);

db.users.hasMany(db.posts, { foreignKey: "userID" });
db.posts.belongsTo(db.users, { foreignKey: "userID" });

// make all the defined models available in other files:
module.exports = db;
