const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/loginRoute");

const app = express();
mongoose.connect(
  `mongodb+srv://njzAdmin:MongoTest@cluster0.eqvbavg.mongodb.net/recipe?retryWrites=true&w=majority`,
  (err) => {
    if (err) {
      console.log("err", err);
    } else {
      console.log("connected to DB");
    }
  }
);
app.use(cors());
app.use(bodyParser.json());
app.use("/users", loginRoute);

app.listen(5000, () => console.log("server is listening at port 5000"));
