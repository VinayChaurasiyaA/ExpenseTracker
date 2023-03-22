const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "./config.env" });

const con = require("./db/connections.js");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/route.js"));
con
  .then((db) => {
    if (!db) {
      return process.exit(1);
    }
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });

    app.on("error", (err) => console.log(`Failed to connect ${err}`));
  })
  .catch((error) => {
    console.log(error);
  });
