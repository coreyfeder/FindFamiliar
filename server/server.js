import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors"
import express from "express";
import familiarRoutes from "./routes/familiars.mjs";
import userRoutes from "./routes/users.mjs";
import internalRoutes from "./routes/internal.mjs";
import { log, L } from "./config/logging.js";
import { model } from "mongoose"


const port = process.env.PORT || 5000;
await connectDB();

const app = express();
const router = express.Router();
const debugrouter = express.Router();
debugrouter.text = L.fg.blue;

app.use(cors());
app.use(express.json());
app.use("/", router);
if (process.env.MODE == 'DEBUG') {
    app.use("/", debugrouter);
    console.log("\x1b[35m");  // ANSI escape code. Different terminals may portray different colors.
    console.log("WARNING: DEBUG MODE.");
    console.log("Request bodies will be emit to the log.");
    console.log("There's no PII to worry about, but it'll get pretty busy.");
    console.log("\x1b[0m");  // back to normal
}


// ROUTER

// router logs all the incoming calls, before they're processed
router.use((req, res, next) => {
    log(
        [
            new Date().toISOString(),
            "req",
            req.method,
            req.path,
        ].join(" : ")
    );
    next();
});

// if we're in debug mode, output the entire request body
debugrouter.use((req, res, next) => {
    log(
        debugrouter.text,
        [
            new Date().toISOString() + " : DEBUG",
            "url:" + req.url,
            "route:" + req.route,
            "params:" + req.params,
            "rawHeaders:" + req.rawHeaders,
            "body: " + JSON.stringify(req.body),
        ].join("\n >> ")
    );
    next();
});


// ROUTES

if (process.env.MODE == 'DEBUG') {
    app.route("/userlist").get((req, res) => internalRoutes.fetchUsersList(req, res));
}

// <familiars> stays READ-ONLY
app.route("/familiars").get((req, res) =>
    familiarRoutes.listFamiliarNames(req, res));
app.route("/familiars/:familiar_id").get((req, res) =>
    familiarRoutes.fetchFamiliarById(req, res));
app.route("/familiars/details").get((req, res) =>
    familiarRoutes.listFamiliars(req, res));
app.route("/familiars/details/:familiar_id").get((req, res) =>
    familiarRoutes.fetchFamiliarById(req, res));  // duplicates "familiars/:familiar_id"
app.route("/familiars/id/:familiar_id").get((req, res) =>
    familiarRoutes.fetchFamiliarById(req, res));
app.route("/familiars/name/:familiar_name").get((req, res) =>
    familiarRoutes.fetchFamiliarByName(req, res));

app.route("/users/")
    // .get((req, res) => NO)
    .post((req, res) => userRoutes.TODO(req, res))
    .put((req, res) => userRoutes.TODO(req, res))
    .delete((req, res) => userRoutes.TODO(req, res));

app.route("/users/:user_id")
    .get((req, res) => userRoutes.TODO(req, res))
    .post((req, res) => userRoutes.TODO(req, res))
    .put((req, res) => userRoutes.TODO(req, res))
    .delete((req, res) => userRoutes.TODO(req, res));

/*
app.route("/users/:user_id/roster")
    .get(rosterRoutes.TODO(req, res));
    .post(rosterRoutes.TODO(req, res));
    .put(rosterRoutes.TODO(req, res));
    .delete(rosterRoutes.TODO(req, res));

app.route("/users/:user_id/roster/:roster_id")
    .get(rosterRoutes.TODO(req, res));
    .post(rosterRoutes.TODO(req, res));
    .put(rosterRoutes.TODO(req, res));
    .delete(rosterRoutes.TODO(req, res));

 */


app.all("*", (req, res) => {
    res.status(404).send({error: "You have made an invalid HTTP call or called a nonexistent resource."});
});


app.use((err, req, res, next) => {
    console.error(
        [
            new Date().toISOString(),
            "ERROR! Call failed unrecoverably!",
            req.path,
        ].join(" : ")
    );
    console.error(err.stack);
    res.status(404).json({error: `Error accessing resource. ${err}`});
});




// ENGAGE

app.listen(port, ()=>{
    log(L.fg.yellow, L.bright, `FindFamiliar API listening on port ${port}\n`);
});
