import User from "../models/users.mjs";

const DEBUG = Boolean(process.env.MODE == "DEBUG");
const BASE_USER_ID = "662a6778374fd86cd00fed03";

// sample/outline functions. don't write them until I finalize the "user" flow
// make sure to use async/await
/*
function saveUserIdToClient() {
    // TODO
    // save the user's ID in localStorage/cookie/whatever
};

function fetchUserIdFromClient() {
    // TODO
    // read the user's ID from localStorage/cookie/whatever
};

function deleteUser(id) {
    // TODO
    // <fake delete>
    // "auth": make sure the id given matches the storage id
    // "delete": delete the id from storage
    // if I have time: actually delete the DB record
};

function createId() {
    // TODO
    // no browser fingerprinting or anything
    // make a randomish string as a user ID
    // save it in a cookie?
    // --> just use the ObjectID?
};

function createNewOldUser() {
    // TODO
    // That's right, create a new old user:
    //   Make a new User record, but populate it with prefab data
    // Why? So we don't need to do any real auth.
    //   Plus, it shows the actual user what can be done,
    //      without them needing to invest the time to find out
    // We could just mimic the auth
    //  accept any username and password
    //  or accept any username and make it unique-ish by adding the IP
    // TBD
};
 */

async function TODO(req, res) {
    await User.findOne();
    res.send(Object.keys(req))
}

async function _getManyUsers(filter=null, projection=null, lean=false) {
    let userList = await User.find(filter).select(projection).lean(lean);
    // if (!(userList)) userList=[];  // or something?
    return userList;
}

async function listUsers(req, res) {
    let userList = _getManyUsers();
    res.json(userList);
}

async function listUserNames(req, res) {
    let userList = _getManyUsers(projection={ _id: 1, name: 1 });
    res.json(userList);
}


async function _fetchUser(user_id, projection=null, lean=false) {
    const foundUser = await User.findById(user_id)
        .select(projection)
        .lean(lean)
        .populate("roster.familiars")  // https://mongoosejs.com/docs/api/document.html#Document.prototype.populate()
        .exec()
        ;
    return foundUser;
};

async function fetchUser(req, res) {
    let foundUser = _fetchUser(req.params.id);
    if (!(foundUser)) {
        console.debug(`No user found with id "${req.params.id}".`);
    }
    res.json(foundUser);
};

async function createUser(req, res) {
    const baseUser = _fetchUser(BASE_USER_ID);
    const newUser = await User.create(...baseUser).select({ _id: 1 });
    res.json(newUser);
};

async function deleteUser(req, res) {
/*
    let foundUser = _fetchUser(req.params.id);
    if (!(foundUser)) {
        console.debug(`No user found with id "${req.params.id}".`);
    }
    res.json(foundUser);
 */
    try {
        let result = User.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (e) {
        console.error(`Unable to delete user ${req.params.id}`);
        console.error(e);
        res.status(400).json(`Unable to delete user ${req.params.id}; ${e}`);
    }
};


const userRoutes = {
    TODO,
    fetchUser,
    createUser,
    deleteUser,
};

export default userRoutes;
