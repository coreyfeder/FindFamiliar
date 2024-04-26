import Familiar from "../models/familiars.mjs";

async function _listFamiliars(req, res, projection=null) {
    const familiarList = await Familiar.find().select(projection).lean();
    if (familiarList) {
        res.send(familiarList);
    } else {
        res.status(404).json({ error: `Resource not found.` });
    }
}

async function listFamiliars(req, res) {
    // const familiarList = await Familiar.find();
    _listFamiliars(req, res);
}

function listFamiliarNames(req, res) {
    _listFamiliars(req, res, {_id: 1, name: 1})
}

async function fetchFamiliarById(req, res) {
    const foundFamiliar = await Familiar.findById(req.params.familiar_id);
    if (foundFamiliar) {
        res.send(foundFamiliar);
    } else {
        res.status(404).json({ error: `Resource not found.` });
    }
}

async function fetchFamiliarByName(req, res) {
    const foundFamiliar = await Familiar.findOne({name: req.params.familiar_name});
    if (foundFamiliar) {
        res.send(foundFamiliar);
    } else {
        res.status(404).json({ error: `Resource not found.` });
    }
}


const familiarRoutes = {
    listFamiliars,
    listFamiliarNames,
    fetchFamiliarById,
    fetchFamiliarByName,
};
export default familiarRoutes;
