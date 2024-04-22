import mongoose from "mongoose";
import familiarSchema from "./familiars.mjs";

const userSchema = new mongoose.Schema({
    ipid: { type: String, trim: true, required: true, index: text, },
    name: { type: String, trim: true, required: true, },
    familiars: [ familiarSchema ],
});

export default mongoose.model(schema=userSchema, collection="users");
