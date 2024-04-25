import "dotenv/config";
import connectDB from "./config/db.js";
import cors from "cors"
import express from "express";
// import familiarsController from "./controllers/familiars.js";
// import rostersController from "./controllers/rosters.js";
// import usersController from "./controllers/users.js";


const port = process.env.PORT || 5000;
connectDB();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
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
        ]
    );
    next();
});


// ROUTES


// familiars stays read-only
app.route("/familiars")
.get(familiarsController.fetchFamiliars)
app.route("/familiars/:familiar_id")
.get(familiarsController.fetchFamiliar(familiar_id))

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
    res.status(404).json({error: "Resource not found."});
});


app.use((err, req, res, next) => {
    console.error(
        new Date().toISOString(),
        " : ",
        "Call failed unrecoverably!",
        " : ",
        req.path,
    );
    console.error(err.stack);
    res.status(404).json({error: `Error accessing resource. ${err}`});
});






// ENGAGE

app.listen(port, ()=>{
    console.log(`FFAPI listening on port ${port}`)
})
