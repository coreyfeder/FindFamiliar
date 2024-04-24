import mongoose from "mongoose";

// `roster` is a legitimate subdocument array, but the `familiar`
// each subdoc holds is a *populated* document, NOT a subdocument.
// The `$lookup` call to populate it is slow and costly; consider
// limiting the number of familiars a roster can hold.

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true, default: "Caretaker" },
    roster: [
        new mongoose.Schema({
            name: {
                type: String,
                required: true,
                maxlength: 42,
                trim: true,
                default: this.familiar.name,
            },
            familiar: {
                // conflicting recs on whether to use Schema.Types.ObjectId or SchemaTypes.ObjectId
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Familiar",
                required: true,
            },
            note: {
                type: String,
                trim: true,
                maxlength: 500,
                default: "",
            },
        }),
    ],
});

const User = mongoose.model((schema = userSchema), (collection = "users"));
export default User;
