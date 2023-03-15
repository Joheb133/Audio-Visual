const express = require("express");
const app = express();

app.use(express.static("src"))

const streamRouter = require("./routes/stream");
app.use("/stream", streamRouter);

app.listen(80, () => {
    console.log(`Server running on http://localhost:${80}`);
});