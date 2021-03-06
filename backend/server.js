require("dotenv").config();
const express = require("express");
const connectDB = require("./db/init");
const UserRoutes = require("./routes/userRoutes");
const ChatRoutes = require("./routes/chatRoute");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/user", UserRoutes);
app.use("/chat", ChatRoutes);

console.clear();

connectDB().then(() =>
  app.listen(PORT, console.log(`server is running from port : ${PORT}`))
);
