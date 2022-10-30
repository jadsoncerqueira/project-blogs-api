const categoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
    }, {
      timestamps: false,
      underscored: true,
    });
    
    return Category;
  };
    
  module.exports = categoryModel;