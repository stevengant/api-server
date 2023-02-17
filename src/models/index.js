'use strict';

require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const food = require('./food');
const clothes = require('./clothes');
const Collection = require('./collection');



// if sqlite::memory does not work, use sqlite:memory
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

// db singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);

const foodModel = food(sequelizeDatabase, DataTypes);
const clothesModel = clothes(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  foodModel,
  clothesModel,
  clothesCollection: new Collection(clothesModel),
  foodCollection: new Collection(foodModel)
};