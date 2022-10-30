const postCategoryModel = (sequelize, DataTypes) => {
    const postCategory = sequelize.define('PostCategory', 
    {
        postId: { type: DataTypes.INTEGER, primaryKey: true },
        categoryId: { type: DataTypes.INTEGER, primaryKey: true }
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories'
    });

    postCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
          as: 'categories',
          through: postCategory,
          foreignKey: 'categoryId',
          otherKey: 'postId',
        });
        models.Category.belongsToMany(models.BlogPost, {
          as: 'posts',
          through: postCategory,
          foreignKey: 'postId',
          otherKey: 'categoryId',
        });
    };
    
    return postCategory;
  };
    
  module.exports = postCategoryModel;