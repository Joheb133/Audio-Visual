const express = require("express");
const app = express();

app.use(express.static("public"))

const streamRouter = require("./routes/stream");
app.use("/stream", streamRouter);

app.listen(8000);

console.log("http://localhost:8000")