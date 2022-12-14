'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Playlist.hasMany(models.PlaylistSong, {
        foreignKey: 'playlistId',
        onDelete: 'CASCADE',
        hooks: true
      });

      Playlist.belongsToMany(models.Song, {
        through: models.PlaylistSong,
        foreignKey: 'playlistId'
      })

    }
  }
  Playlist.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
