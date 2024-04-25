import mongoose from "mongoose";

const familiarSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },  // add index: text?
    description: { type: String, trim: true, required: true, default: "" },
    stats: {
        offense: { type: Number, required: true },
        defense: { type: Number, required: true },
        intelligence: { type: Number, required: true },
        riz: { type: Number, required: true },
        cuddle_inspiration: { type: Number, required: true },
        cuddle_tolerance: { type: Number, required: true },
        stealth: { type: Number, required: true },
        intimidation: { type: Number, required: true },
        peril: { type: Number, required: true },
    },
    stats_notes: {
        offense: { type: String, required: false },
        defense: { type: String, required: false },
        intelligence: { type: String, required: false },
        riz: { type: String, required: false },
        cuddle_inspiration: { type: String, required: false },
        cuddle_tolerance: { type: String, required: false },
        stealth: { type: String, required: false },
        intimidation: { type: String, required: false },
        peril: { type: String, required: false },
    },
});

// const Familiar = mongoose.model(schema=familiarSchema, collection="familiars");
const Familiar = mongoose.model("Familiar", familiarSchema);

export default Familiar;
