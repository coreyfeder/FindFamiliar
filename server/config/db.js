// One-and-done imports
if (process.env.MODE != "production" ) {
    // TODO: confirm this does the same as `require("dotenv").config();`
    import "dotenv/config";
}

import mongoose from "mongoose";

let str, add, first
str = "qwer";
// add = ["asdf", "zxcv"]
add = []
first = true;
for (const s of add) {
    let news = (first ? "?" : "&" ) + s;
    console.log(`adding "${news}"`);
    str += news;
    first = false;
}
console.log(str)

// NEXT: construct or declare the connection string
// DRAFT
// this section is entirely overengineered,
// but for now I want to keep track of what makes up the connection string
const MDB_OPTIONS =[
    // these are known in this case, but they could be read in or determined programmatically
    "retryWrites=true",
    "w=majority",
];
if (MDB_OPTIONS > "") connectString += "?" + MDB_OPTIONS.join("&");

let connectString = `mongodb+srv://` +
                    `${encodeURIComponent(process.env.MDB_USERNAME)}`     + // auth: username
                    `:${encodeURIComponent(process.env.MDB_PASS)}`        + // auth: pw, auth token, etc.
                    `@${process.env.MDB_APPID}.${process.env.MDB_SERVER}` + // full server name
                    `/${process.env.MDB_DATABASE}`                        + // any "path"
                    "";

console.debug("DEBUG: connectString: " + connectString)

// NEXT: write the function that makes the connection
//  * async
//  * use `try ... catch ... `
//  ? bomb on failure
//  * log results
// DRAFT
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connectString, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`DEBUG: DB Connection Failed!`)
        console.log(`error ${error.message}`)
    }
}

// NEXT: export (`export default` or `module.exports`)
// DRAFT
export default connectDB;



// --- examples ----------- -----------
/*
import mongoose from "mongoose";
 */
const CONNECTION_URL =
  "mongodb+srv://ariestitt:mokube123@cluster0.jozbiey.mongodb.net/memories?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(CONNECTION_URL);
    console.log(`connected to db`)
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

// -----------

if (process.env.MODE != "production" ) { require("dotenv").config(); }
const mongoose = require('mongoose');

// MongoDB connection elements
// const REGION="us-east-1.aws"
const DB_PREFIX = "mongodb+srv"
const DB_APPNAME = "honeynutcluster"
const DB_APPID = "71qzsuw"
const DB_SERVERROOT = "mongodb.net"
const DB_DATABASE = "fullcrud"

const DB_USERNAME = encodeURIComponent(process.env.MDB_USERNAME)
const DB_PASSWORD = encodeURIComponent(process.env.MDB_PASSWORD)

const DB_AUTHSTRING = `${DB_USERNAME}:${DB_PASSWORD}`
const DB_SERVER = [DB_APPNAME, DB_APPID, DB_SERVERROOT].join(".")

const connectString = `${DB_PREFIX}://${DB_AUTHSTRING}@${DB_SERVER}/${DB_DATABASE}`

// console.debug("DEBUG: connectString: " + connectString)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connectString)
        console.log(`mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`DEBUG: DB Connection Failed!`)
        console.log(`error ${error.message}`)
    }
}

// export default connectDB  // not with Common style
module.exports = connectDB;

/*
// If we are only making a conneciton one time, how do we access different collections?
// is this valid syntax?
let targetCollection = 'test';
await mongoose.connect(connectString, {'collection': targetCollection});
*/
