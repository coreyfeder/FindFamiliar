// repl testing: .load this from the REPL

const { default: connectDB } = await import("./config/db.js");
await connectDB();

const { default: routes } = await import("./routes/index.js");
const { default: models } = await import("./models/index.js");
