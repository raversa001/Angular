const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://145.239.196.97:4200"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

app.get("/", (req, res) => {
  res.json({ message: "404" });
});

require("./app/routes/assignment.routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});