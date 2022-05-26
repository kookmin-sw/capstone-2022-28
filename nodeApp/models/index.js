"use strict";

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const User = require("./user");
const Comment = require("./comment");
const Video = require("./video");
const Exhibition = require("./exhibition");
const Token = require("./token");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Comment = Comment;
db.Video = Video;
db.Exhibition = Exhibition;
db.Token = Token;

User.init(sequelize);
Comment.init(sequelize);
Video.init(sequelize);
Exhibition.init(sequelize);
Token.init(sequelize);

User.associate(db);
Comment.associate(db);
Video.associate(db);
Exhibition.associate(db);
Token.associate(db);

module.exports = db;
