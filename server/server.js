// One-and-done imports
if (process.env.MODE != "production" ) {
    import "dotenv/config";
}
import "./config/db.js/connectDB";
// TODO: confirm this does the same as
//  ```
//      import connectDB from "./config/db.js";
//      connectDB();
//  ```

import express from "express";
// ?? import cors from "cors"





const port = process.env.PORT || 5000;

const app = express()
app.use(cors());

app.get("/", (req, res)=>{
    res.send("api...")
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
