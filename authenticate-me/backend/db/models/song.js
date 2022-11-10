'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Song.belongsTo(models.Album, {
        foreignKey: 'albumId'
      });

      Song.hasMany(models.Comment, {
        onDelete: 'cascade'
      });

      Song.belongsToMany(models.Playlist, {
        through: 'PlaylistSong'
      })
    }
  }
  Song.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
