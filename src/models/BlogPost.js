const blogPostModel = (sequelize, DataTypes) => {
    const blogPost = sequelize.define('BlogPost', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    }, {
      timestamps: false,
      underscored: true,
    });

    blogPost.associate = (models) => {
      blogPost.belongsTo(models.User, {
        foreignKey: 'userId', as: 'user'
      });
    };
    
    return blogPost;
  };
    
  module.exports = blogPostModel;