import user from "../models/users.mjs";

// sample/outline functions. don't write them until I finalize the "user" flow
// make sure to use async/await

function saveUserIdToClient() {
    // TODO
    // save the user's ID in localStorage/cookie/whatever
}

function fetchUserIdFromClient() {
    // TODO
    // read the user's ID from localStorage/cookie/whatever
}

function deleteUser(id) {
    // TODO
    // <fake delete>
    // "auth": make sure the id given matches the storage id
    // "delete": delete the id from storage
    // if I have time: actually delete the DB record
}

function createId() {
    // TODO
    // no browser fingerprinting or anything
    // make a randomish string as a user ID
    // save it in a cookie?
    // --> just use the ObjectID?
}

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
}

async function fetchUser(id) {
    // TODO
    //
    let foundUser = await user.findOne( /* ... */ )
        .exec()
        .populate("roster.familiars")  // https://mongoosejs.com/docs/api/document.html#Document.prototype.populate()
    if (!(notes)) {
        console.debug(`Requested note_id "${note_id}" did not match any records.`)
    }
    res.json({notes: notes})

}

/* s
async function internallyProcessApiRequest(req, res) {
    doStuffWithRequest(req);
    call_database(req.params.some_variable_from_the_path);
    etc();
    res.send("a result");
}
 */
module.exports = {
    internallyProcessApiRequest,
    internallyProcessAnotherApiRequest,
};
