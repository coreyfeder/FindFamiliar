import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // IF making a fake ID for fake auth
    // id: { type: String, trim: true, required: true, index: text, },
    name: { type: String, trim: true, required: true, },
    roster: [
        new mongoose.Schema({
            name: String,
            familiar: {
                // conflicting recs on whether to use Schema.Types.ObjectId or SchemaTypes.ObjectId
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Familiar",
                required: true,
            },
            note: {
                type: String,
                maxlength: 500,
            },
            // images: [ /* ??? */ ],
            // as BinData?
            // use GridFS? https://www.mongodb.com/docs/manual/core/gridfs/
            // use mongoose-gridstore plugin?
            //      https://www.npmjs.com/package/mongoose-gridstore
            // use mongoose-gm plugin for images?
            //      https://www.npmjs.com/package/mongoose-gm
            // use multer? https://github.com/expressjs/multer#usage
        })
    ],
});

const User = mongoose.model(schema=userSchema, collection="users");
export default User;
