import mongoose from "mongoose";

const familiarSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true, index: text, },
    description: { type: String, trim: true, required: true, },
    environment: { type: String, trim: true, },
    trust: { type: String, trim: true, },
    offense: { type: Number, required: true, },
    offense_note: { type: String, trim: true, },
    defense: { type: Number, required: true, },
    defense_note: { type: String, trim: true, },
    riz: { type: Number, required: true, },
    riz_note: { type: String, trim: true, },
    cuddle_charm: { type: Number, required: true, },
    cuddle_charm_note: { type: String, trim: true, },
    cuddle_tolerance: { type: Number, required: true, },
    cuddle_tolerance_note: { type: String, trim: true, },
    stealth: { type: Number, required: true, },
    stealth_note: { type: String, trim: true, },
    intimidation: { type: Number, required: true, },
    intimidation_note: { type: String, trim: true, },
    individuality: { type: Number, required: true, },
    individuality_note: { type: String, trim: true, },
    peril: { type: Number, required: true, },
    peril_note: { type: String, trim: true, },
});

export default mongoose.model(schema=familiarSchema, collection="familiars");
