// One-and-done imports
if (process.env.MODE != "production" ) {
    import "dotenv/config";
    if (process.env.MDB_DATABASE === undefined) {
        import dotenv from 'dotenv';
        dotenv.config({path: "../.env"});
    }
}

import mongoose from "mongoose";

// NEXT: construct or declare the connection string
// This _should_ use a server API key
//      but...Mongoose can only use username:password credentials??
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
                    `:${encodeURIComponent(process.env.MDB_PASS)}`        + // auth: pw
                    `@${process.env.MDB_APPID}.${process.env.MDB_SERVER}` + // full server name
                    `/${process.env.MDB_DATABASE}`                        + // any "path"
                    "";

// console.debug("DEBUG: connectString: " + connectString)

// NEXT: write the function that makes the connection
//  * async
//  * use `try ... catch ... `
//  ? bomb on failure
//  * log results
// DRAFT
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connectString);
        console.log(`mongodb connected via mongoose: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: database connection failed: ${error.message}`);
        process.exit(1);
    };
};

export default connectDB;
// or `module.exports = connectDB;` with Common style, but shouldn't need that
