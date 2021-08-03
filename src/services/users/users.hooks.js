const { authenticate } = require('@feathersjs/authentication').hooks;

const { protect
} = require('@feathersjs/authentication-local').hooks;

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {   
        const hashPassword = await bcrypt.hash(context.data.password, saltRounds)
        context.data.password = hashPassword
        return context             
      }
    ]
    //create: [ hashPassword('password') ],
    /* update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ] */
  },

};
