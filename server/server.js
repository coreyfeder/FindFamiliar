import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors"
import express from "express";
import routes from "./routes/index.js";


const port = process.env.PORT || 5000;
await connectDB();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use("/", router);


// ROUTER

// router logs all the incoming calls, before they're processed
router.use((req, res, next) => {
    console.log(
        [
            new Date().toISOString(),
            "req",
            req.method,
            req.path,
            JSON.stringify(req.body),
        ].join(" : ")
    );
    next();
});


// ROUTES

// <familiars> stays READ-ONLY
app.route("/familiars")
    .get((req, res) => routes.familiars.listFamiliarNames(req, res));
app.route("/familiars/details")
    .get((req, res) => routes.familiars.listFamiliars(req, res));
app.route("/familiars/details/:familiar_id")
    .get((req, res) => routes.familiars.fetchFamiliarById(req, res));
app.route("/familiars/id/:familiar_id")
    .get((req, res) => routes.familiars.fetchFamiliarById(req, res));
app.route("/familiars/name/:familiar_name")
    .get((req, res) => routes.familiars.fetchFamiliarByName(req, res));

app.route("/users")
    .get((req, res) => routes.users.fetchUsers(req, res));
/*
app.route("/users/:user_id")
    .get(usersController.TODO("..."))
    .post(usersController.TODO("..."))
    .put(usersController.TODO("..."))
    .delete(usersController.TODO("..."));

app.route("/users/:user_id/roster")
    .get(rostersController.TODO("..."))
    .post(rostersController.TODO("..."))
    .put(rostersController.TODO("..."))
    .delete(rostersController.TODO("..."));

app.route("/users/:user_id/roster/:roster_id")
    .get(rostersController.TODO("..."))
    .post(rostersController.TODO("..."))
    .put(rostersController.TODO("..."))
    .delete(rostersController.TODO("..."));

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
    console.log(`FFAPI listening on port ${port}`)
});
