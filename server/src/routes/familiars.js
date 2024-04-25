import familiar from "../models/familiars.mjs";

function getFamiliarList(req, res) {
    let familiarList = familiar.find().projection(exclude { '_id' })
    const familiarList = await familiar.find();
    console.log(familiarList);//
    res.json(familiarList);
}

function getFamiliarById(req, res) {
    let foundFamiliar = familiar.findById(req.params.familiar_id);
    if (foundFamiliar) {
        res.json(foundFamiliar);
    } else {
        res.status(404).json({ error: `Resource not found.` });
    }
}

module.exports = {
    getFamiliarList,
    getFamiliarById,
};
