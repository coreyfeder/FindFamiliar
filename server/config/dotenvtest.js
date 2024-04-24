// import 'dotenv/config';
// import {} from 'dotenv/config'
// import dotenv from 'dotenv'; dotenv.config();
// import { config } from 'dotenv'; config();
// require("dotenv").config();
// module.require("dotenv").config();

// import 'dotenv/config({path: "../.env", debug: true})';
// import dotenv from 'dotenv';

// dotenv.config(path="../", debug=true)
// dotenv.config(debug=true)
// dotenv.config({path: "../.env", debug: true})
// dotenv.configDotenv()
// dotenv.configDotenv({path: "../.env", debug: true})


import dotenv from 'dotenv';
dotenv.configDotenv({path: "../.env", debug: true})
console.log("MDB_DATABASE: ", process.env.MDB_DATABASE)
