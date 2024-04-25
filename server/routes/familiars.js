import Familiar from "../models/familiars.mjs";

async function getFamiliarList(req, res) {
    const familiarList = await Familiar.find();
    console.log(familiarList);
    if (familiarList) {
        res.json(familiarList);
    } else {
        res.status(404).json({ error: `Resource not found.` });
    }
}

async function getFamiliarById(req, res) {
    let foundFamiliar = await Familiar.findById(req.params.familiar_id);
    if (foundFamiliar) {
        res.send(foundFamiliar);
    } else {
        res.status(404).json({ error: `Resource not found.` });
    }
}

async function getFamiliarByName(req, res) {
    let foundFamiliar = await Familiar.findOne({name: req.params.familiar_name});
    if (foundFamiliar) {
        res.send(foundFamiliar);
    } else {
        res.status(404).json({ error: `Resource not found.` });
    }
}


const familiarRoutes = {
    getFamiliarList,
    getFamiliarById,
    getFamiliarByName,
};
export default familiarRoutes;
