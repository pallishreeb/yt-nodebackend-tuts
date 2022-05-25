module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a name" },
        notEmpty: { msg: "Name must not be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "User must have a email" },
        notEmpty: { msg: "email must not be empty" },
        isEmail: { msg: "Must be a valid email address" },
      },
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  });

  return Users;
};
