import Sequelize from 'sequelize';
// import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Student from '../app/models/Student';

const models = [User, File, Student];
class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    // this.mongoConnection = mongoose.connect(
    //     'mongodb://localhost:27017/gobarber',
    //     { useNewUrlParser: true, userFindAndModify: true }
    // );
  }
}

export default new Database();
