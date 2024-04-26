import User from "../models/users.mjs";

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

async function fetchUsers(req, res) {
    let foundUsers = await User.find()
        .populate(this.roster)  // https://mongoosejs.com/docs/api/document.html#Document.prototype.populate()
        .exec()
        ;
    console.debug("DEBUG:", "foundUsers:", foundUsers)
    if (!(foundUsers)) {
        console.debug(`No users found.`);
    };
    res.json({"users": foundUsers});
};

async function fetchUser(req, res) {
    let foundUser = await User.findOne( { _id: req.params.id } )
        .populate("roster.familiars")  // https://mongoosejs.com/docs/api/document.html#Document.prototype.populate()
        .exec()
        ;
    if (!(notes)) {
        console.debug(`No user found with id "${req.params.id}".`);
    }
    res.json(foundUser);
};


const userRoutes = {
    fetchUser,
    fetchUsers,
};

export default userRoutes;
