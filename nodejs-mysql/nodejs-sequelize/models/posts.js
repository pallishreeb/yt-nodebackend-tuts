module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define(
    "posts",
    {
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "posts" }
  );

  return posts;
};
