import "dotenv/config";
import connectDB from "./config/db.js";

import cors from "cors"
import express from "express";

const port = process.env.PORT || 5000;
connectDB();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use("/", router);


// ROUTER

// use a router to log the transactions
router.use((req, res, next) => {
    console.debug("DEBUG: ", req.body)
    console.log(
        [
            new Date().toISOString(),
            "req",
            req.method,
            req.path,
            JSON.stringify(req.body),
        ].join(" : "),
    );
    next();
});

// ROUTES




app.get("/", (req, res)=>{
    res.send("Behold, an API route. Technically.")
})

app.get("/api/products",( req, res)=>{
    res.json(products)
})

app.get("/api/products/:id",( req, res)=>{
    const product = products.find((p)=> p._id === req.params.id)
    res.json(product)
})


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
