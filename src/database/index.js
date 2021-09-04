import Sequelize from "sequelize";
import mongoose from 'mongoose';

import User from '../app/models/User';
import Appointment from '../app/models/Appointment';
import File from '../app/models/File';
import databaseConfig from '../config/database';

const models = [ User, Appointment, File ];

class Database{
  constructor(){
    this.init()
    this.mongo()
  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
  mongo(){
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://luizalab-noslq:L92h8u69h5tGX6iE@luizacoders.flfpc.mongodb.net/Notifications?retryWrites=true&w=majority', 
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  }
}

export default new Database();