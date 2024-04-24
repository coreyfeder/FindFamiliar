import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    note: { type: String, trim: true },
});

const familiarSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true, index: text },
    description: { type: String, trim: true, required: true, default: "" },
    stats: {
        offense: { type: statSchema, default: () => ({}) },
        defense: { type: statSchema, default: () => ({}) },
        riz: { type: statSchema, default: () => ({}) },
        cuddle_charm: { type: statSchema, default: () => ({}) },
        cuddle_tolerance: { type: statSchema, default: () => ({}) },
        stealth: { type: statSchema, default: () => ({}) },
        intimidation: { type: statSchema, default: () => ({}) },
        peril: { type: statSchema, default: () => ({}) },
    },
});

// const Familiar = mongoose.model(schema=familiarSchema, collection="familiars");
const Familiar = mongoose.model("Familiar", familiarSchema);

export default Familiar;
