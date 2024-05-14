import mongoose from "mongoose";

export const connect = async () => {
  try {
    // mongoose.connect(process.env.MONGO_URL != undefined ? process.env.MONGO_URL : "");
    //or
    mongoose.connect(process.env.MONGO_URL!);

    //event listeners
    mongoose.connection.on("connected", () => {
      console.log("DataBase is connected");
    });
    mongoose.connection.on("error", (err) => {
      console.log("MongoDb connection error" + err);
      process.exit(); //exit the code and not run the app further without database.
    });
  } catch (error) {
    console.log("Something when wrong in connecting to Db");
    console.log(error);
  }
};
