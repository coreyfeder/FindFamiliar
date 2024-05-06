import Familiar from "../models/familiars.mjs";
import User from "../models/users.mjs";

const DEBUG = Boolean(process.env.MODE == "DEBUG");

function illegalEndpointCall(req, res) {
    console.error(
        [
            new Date().toISOString(),
            "ERROR! Private endpoint called",
            req.path,
        ].join(" : ")
    );
    console.error(JSON.stringify(req))
    res.status(404).json({error: `Error accessing resource. ${err}`});
}

async function fetchUserList(req, res) {
    if (not (DEBUG)) {
        illegalEndpointCall(req, res);
        return "error";
    } else {
        let foundUsers = await User.find()
        .populate(this.roster)  // https://mongoosejs.com/docs/api/document.html#Document.prototype.populate()
        .exec()
        ;
        console.debug("DEBUG:", "foundUsers:", foundUsers)
        if (!(foundUsers)) {
            console.debug(`No users found.`);
        };
        res.json({"users": foundUsers});
    }
};


const internalRoutes = {
    fetchUserList,
};

export default internalRoutes;
