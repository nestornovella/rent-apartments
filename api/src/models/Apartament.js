const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Apartament", {

    image: {
      type: DataTypes.TEXT
    },
    name: {
      type: DataTypes.STRING
    },
    ubication: {
      type: DataTypes.STRING
    },
    available: {
      type: DataTypes.BOOLEAN
    },
    price: {
      type: DataTypes.FLOAT
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    
  });
};