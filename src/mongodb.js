const userModal = require('./models/users')


// mongoose.js - Mongoose adapter
const mongoose = require('mongoose');

module.exports = function (app) {  
  mongoose.Promise = global.Promise;
  const connectionURL = "mongodb+srv://devesakki:React123@cluster0.oxhpz.mongodb.net/test"//app.get('mongodb');
  mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(({ connection }) => {
      console.log(`connected to "${connection.name}" database at ${connection.host}:${connection.port}`);
      app.set('mongoClient', {userModal});
    })
    .catch(error => {
      console.log("error", error);
      process.exit(1);
    });
  return mongoose
  //return true
  
};

