/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.hooks.js":
/*!**************************!*\
  !*** ./src/app.hooks.js ***!
  \**************************/
/***/ ((module) => {

eval("// Application hooks that run for every service\n\nmodule.exports = {\n  before: {\n    all: [],\n    find: [],\n    get: [],\n    create: [],\n    update: [],\n    patch: [],\n    remove: []\n  },\n\n  after: {\n    all: [],\n    find: [],\n    get: [],\n    create: [],\n    update: [],\n    patch: [],\n    remove: []\n  },\n\n  error: {\n    all: [],\n    find: [],\n    get: [],\n    create: [],\n    update: [],\n    patch: [],\n    remove: []\n  }\n};\n\n\n//# sourceURL=webpack://feathers/./src/app.hooks.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const path = __webpack_require__(/*! path */ \"path\");\nconst favicon = __webpack_require__(/*! serve-favicon */ \"serve-favicon\");\nconst compress = __webpack_require__(/*! compression */ \"compression\");\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst logger = __webpack_require__(/*! ./logger */ \"./src/logger.js\");\n\nconst feathers = __webpack_require__(/*! @feathersjs/feathers */ \"@feathersjs/feathers\");\nconst configuration = __webpack_require__(/*! @feathersjs/configuration */ \"@feathersjs/configuration\");\nconst express = __webpack_require__(/*! @feathersjs/express */ \"@feathersjs/express\");\nconst socketio = __webpack_require__(/*! @feathersjs/socketio */ \"@feathersjs/socketio\");\n\n\nconst middleware = __webpack_require__(/*! ./middleware */ \"./src/middleware/index.js\");\nconst services = __webpack_require__(/*! ./services */ \"./src/services/index.js\");\nconst appHooks = __webpack_require__(/*! ./app.hooks */ \"./src/app.hooks.js\");\nconst channels = __webpack_require__(/*! ./channels */ \"./src/channels.js\");\n\nconst app = express(feathers());\n\n// Load app configuration\napp.configure(configuration());\n// Enable security, CORS, compression, favicon and body parsing\napp.use(helmet({\n  contentSecurityPolicy: false\n}));\napp.use(cors());\napp.use(compress());\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\napp.use(favicon(path.join(app.get('public'), 'favicon.ico')));\n// Host the public folder\napp.use('/', express.static(app.get('public')));\n\n// Set up Plugins and providers\napp.configure(express.rest());\napp.configure(socketio());\n\n// Configure other middleware (see `middleware/index.js`)\napp.configure(middleware);\n// Set up our services (see `services/index.js`)\napp.configure(services);\n// Set up event channels (see channels.js)\napp.configure(channels);\n\n// Configure a middleware for 404s and the error handler\napp.use(express.notFound());\napp.use(express.errorHandler({ logger }));\n\napp.hooks(appHooks);\n\nmodule.exports = app;\n\n\n//# sourceURL=webpack://feathers/./src/app.js?");

/***/ }),

/***/ "./src/channels.js":
/*!*************************!*\
  !*** ./src/channels.js ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = function(app) {\n  if(typeof app.channel !== 'function') {\n    // If no real-time functionality has been configured just return\n    return;\n  }\n\n  app.on('connection', connection => {\n    // On a new real-time connection, add it to the anonymous channel\n    app.channel('anonymous').join(connection);\n  });\n\n  app.on('login', (authResult, { connection }) => {\n    // connection can be undefined if there is no\n    // real-time connection, e.g. when logging in via REST\n    if(connection) {\n      // Obtain the logged in user from the connection\n      // const user = connection.user;\n      \n      // The connection is no longer anonymous, remove it\n      app.channel('anonymous').leave(connection);\n\n      // Add it to the authenticated user channel\n      app.channel('authenticated').join(connection);\n\n      // Channels can be named anything and joined on any condition \n      \n      // E.g. to send real-time events only to admins use\n      // if(user.isAdmin) { app.channel('admins').join(connection); }\n\n      // If the user has joined e.g. chat rooms\n      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection));\n      \n      // Easily organize users by email and userid for things like messaging\n      // app.channel(`emails/${user.email}`).join(connection);\n      // app.channel(`userIds/${user.id}`).join(connection);\n    }\n  });\n\n  // eslint-disable-next-line no-unused-vars\n  app.publish((data, hook) => {\n    // Here you can add event publishers to channels set up in `channels.js`\n    // To publish only for a specific event use `app.publish(eventname, () => {})`\n\n    console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line\n\n    // e.g. to publish all service events to all authenticated users use\n    return app.channel('authenticated');\n  });\n\n  // Here you can also add service specific event publishers\n  // e.g. the publish the `users` service `created` event to the `admins` channel\n  // app.service('users').publish('created', () => app.channel('admins'));\n  \n  // With the userid and email organization from above you can easily select involved users\n  // app.service('messages').publish(() => {\n  //   return [\n  //     app.channel(`userIds/${data.createdBy}`),\n  //     app.channel(`emails/${data.recipientEmail}`)\n  //   ];\n  // });\n};\n\n\n//# sourceURL=webpack://feathers/./src/channels.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable no-console */\nconst logger = __webpack_require__(/*! ./logger */ \"./src/logger.js\");\nconst app = __webpack_require__(/*! ./app */ \"./src/app.js\");\nconst port = app.get('port');\nconst server = app.listen(port);\nconst mongooseConnection = __webpack_require__(/*! ./mongodb */ \"./src/mongodb.js\")\n\nprocess.on('unhandledRejection', (reason, p) =>\n  logger.error('Unhandled Rejection at: ', p, reason)\n);\n\nserver.on('listening', async() => {\n    await mongooseConnection(app)\n    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)\n\n  }\n);\n\n\n//# sourceURL=webpack://feathers/./src/index.js?");

/***/ }),

/***/ "./src/logger.js":
/*!***********************!*\
  !*** ./src/logger.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { createLogger, format, transports } = __webpack_require__(/*! winston */ \"winston\");\n\n// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston\nconst logger = createLogger({\n  // To see more detailed errors, change this to 'debug'\n  level: 'info',\n  format: format.combine(\n    format.splat(),\n    format.simple()\n  ),\n  transports: [\n    new transports.Console()\n  ],\n});\n\nmodule.exports = logger;\n\n\n//# sourceURL=webpack://feathers/./src/logger.js?");

/***/ }),

/***/ "./src/middleware/index.js":
/*!*********************************!*\
  !*** ./src/middleware/index.js ***!
  \*********************************/
/***/ ((module) => {

eval("// eslint-disable-next-line no-unused-vars\nmodule.exports = function (app) {\n  // Add your custom middleware here. Remember that\n  // in Express, the order matters.\n};\n\n\n//# sourceURL=webpack://feathers/./src/middleware/index.js?");

/***/ }),

/***/ "./src/models/users/index.js":
/*!***********************************!*\
  !*** ./src/models/users/index.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\nconst usersSchema = new Schema({\n  email: {\n    type: String,\n    required: true\n  },\n  password: {\n    type: String,\n    required: true\n  }\n});\nconst Model = mongoose.model('users', usersSchema);\n\nmodule.exports = Model;\n\n//# sourceURL=webpack://feathers/./src/models/users/index.js?");

/***/ }),

/***/ "./src/mongodb.js":
/*!************************!*\
  !*** ./src/mongodb.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const userModal = __webpack_require__(/*! ./models/users */ \"./src/models/users/index.js\")\n\n\n// mongoose.js - Mongoose adapter\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nmodule.exports = function (app) {  \n  mongoose.Promise = global.Promise;\n  const connectionURL = \"mongodb+srv://devesakki:React123@cluster0.oxhpz.mongodb.net/test\"//app.get('mongodb');\n  mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })\n    .then(({ connection }) => {\n      console.log(`connected to \"${connection.name}\" database at ${connection.host}:${connection.port}`);\n      app.set('mongoClient', {userModal});\n    })\n    .catch(error => {\n      console.log(\"error\", error);\n      process.exit(1);\n    });\n  return mongoose\n  //return true\n  \n};\n\n\n\n//# sourceURL=webpack://feathers/./src/mongodb.js?");

/***/ }),

/***/ "./src/services/index.js":
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const users = __webpack_require__(/*! ./users/users.service */ \"./src/services/users/users.service.js\")\n\n// eslint-disable-next-line no-unused-vars\nmodule.exports = function (app) {\n    app.configure(users);\n};\n\n\n//# sourceURL=webpack://feathers/./src/services/index.js?");

/***/ }),

/***/ "./src/services/users/users.class.js":
/*!*******************************************!*\
  !*** ./src/services/users/users.class.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const { Service } = __webpack_require__(/*! feathers-mongodb */ \"feathers-mongodb\");\n\nexports.Users = class Users extends Service {\n  \n  constructor(options, app) {\n    super(options);\n    this.app = app\n  }\n\n  async get(params) {    \n    const { email } = params;\n    console.log(email, email);\n    const db = this.app.get('mongoClient')\n    const user = await db.userModal.findOne({email});    \n    if(user) {\n      return user\n    }\n    throw new Error(\"user_not_found\");\n  }\n  \n  async find() {\n    const db = this.app.get('mongoClient')\n    const users = await db.userModal.find();\n    return users;\n  }\n\n  async create(data){\n    const db = this.app.get('mongoClient')\n    const users = await db.userModal.create(data);\n    return users;\n  }\n\n  getMiniProfile() {\n    console.log(\"ttetetefd>>>>>>>>>>>>>\");\n\n    return { \"Test\": \"oooooooo\", \"POK\": \"lllllll\"};\n\n  }\n};\n\n\n//# sourceURL=webpack://feathers/./src/services/users/users.class.js?");

/***/ }),

/***/ "./src/services/users/users.hooks.js":
/*!*******************************************!*\
  !*** ./src/services/users/users.hooks.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { authenticate } = __webpack_require__(/*! @feathersjs/authentication */ \"@feathersjs/authentication\").hooks;\n\nconst { protect\n} = __webpack_require__(/*! @feathersjs/authentication-local */ \"@feathersjs/authentication-local\").hooks;\n\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst saltRounds = 10;\n\nmodule.exports = {\n  before: {\n    all: [],\n    find: [],\n    get: [],\n    create: [\n      async context => {   \n        const hashPassword = await bcrypt.hash(context.data.password, saltRounds)\n        context.data.password = hashPassword\n        return context             \n      }\n    ]\n    //create: [ hashPassword('password') ],\n    /* update: [ hashPassword('password'),  authenticate('jwt') ],\n    patch: [ hashPassword('password'),  authenticate('jwt') ],\n    remove: [ authenticate('jwt') ] */\n  },\n\n};\n\n\n//# sourceURL=webpack://feathers/./src/services/users/users.hooks.js?");

/***/ }),

/***/ "./src/services/users/users.service.js":
/*!*********************************************!*\
  !*** ./src/services/users/users.service.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// Initializes the `users` service on path `/users`\nconst { Users } = __webpack_require__(/*! ./users.class */ \"./src/services/users/users.class.js\");\nconst Model = __webpack_require__(/*! ../../models/users */ \"./src/models/users/index.js\");\nconst hooks = __webpack_require__(/*! ./users.hooks */ \"./src/services/users/users.hooks.js\");\n\nmodule.exports = async function (app) {  \n  const options = {\n    paginate: app.get('paginate'),\n    name: 'users',\n    Model,\n  };\n\n  // Initialize our service with any options it requires\n  app.use('/users', new Users(options, app));\n  app.use('/users/:email', new Users(options, app));\n  app.use('/messages', {\n    async find(params) {\n      return await app.service('users').getMiniProfile(params);\n    }\n  });\n  \n  // Get our initialized service so that we can register hooks\n  const service = app.service('users');\n\n  service.hooks(hooks);\n};\n\n\n//# sourceURL=webpack://feathers/./src/services/users/users.service.js?");

/***/ }),

/***/ "@feathersjs/authentication":
/*!*********************************************!*\
  !*** external "@feathersjs/authentication" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@feathersjs/authentication");

/***/ }),

/***/ "@feathersjs/authentication-local":
/*!***************************************************!*\
  !*** external "@feathersjs/authentication-local" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@feathersjs/authentication-local");

/***/ }),

/***/ "@feathersjs/configuration":
/*!********************************************!*\
  !*** external "@feathersjs/configuration" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@feathersjs/configuration");

/***/ }),

/***/ "@feathersjs/express":
/*!**************************************!*\
  !*** external "@feathersjs/express" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@feathersjs/express");

/***/ }),

/***/ "@feathersjs/feathers":
/*!***************************************!*\
  !*** external "@feathersjs/feathers" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@feathersjs/feathers");

/***/ }),

/***/ "@feathersjs/socketio":
/*!***************************************!*\
  !*** external "@feathersjs/socketio" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@feathersjs/socketio");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "feathers-mongodb":
/*!***********************************!*\
  !*** external "feathers-mongodb" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("feathers-mongodb");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("serve-favicon");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("winston");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;