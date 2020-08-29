module.exports = (sequelize, DataTypes) => {
  const Username = sequelize.define("username", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Username;
};
