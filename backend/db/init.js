const mongodb = require("mongoose");

const connectDB = async () => {
  try {
    await mongodb.connect(process.env.MONGODB_URL);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
