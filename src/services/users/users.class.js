const { Service } = require('feathers-mongodb');

exports.Users = class Users extends Service {
  
  constructor(options, app) {
    super(options);
    this.app = app
  }

  async get(params) {    
    const { email } = params;
    const db = this.app.get('mongoClient')
    const user = await db.userModal.findOne({email});    
    if(user) {
      return user
    }
    throw new Error("user_not_found");
  }
  
  async find() {
    const db = this.app.get('mongoClient')
    const users = await db.userModal.find();
    return users;
  }

  async create(data){
    const db = this.app.get('mongoClient')
    const users = await db.userModal.create(data);
    return users;
  }

  getMiniProfile() {
    console.log("ttetetefd>>>>>>>>>>>>>");

    return { "Test": "oooooooo", "POK": "lllllll"};

  }
};
