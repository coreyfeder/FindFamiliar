import "dotenv/config";
import mongoose from "mongoose";

// This _should_ use a server API key
//      but...Mongoose can only use username:password credentials??

// this section is entirely overengineered,
// but for now I want to keep track of what makes up the connection string
const MDB_OPTIONS = ["retryWrites=true", "w=majority"];

let connectString =
    `mongodb+srv://` +
    `${encodeURIComponent(process.env.MDB_USERNAME)}` + // auth: username
    `:${encodeURIComponent(process.env.MDB_PASS)}` + // auth: pw
    `@${process.env.MDB_APPID}.${process.env.MDB_SERVER}` + // full server name
    `/${process.env.MDB_DATABASE}` + // any "path"
    "";

if (MDB_OPTIONS > "") connectString += "?" + MDB_OPTIONS.join("&");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connectString);
        console.log(
            `Connected to MongoDB via Mongoose: ${process.env.MDB_APPID}.${process.env.MDB_SERVER}`,
        );
    } catch (error) {
        console.error(`Error: database connection failed: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
