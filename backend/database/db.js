import mongoose from "mongoose";


const Connection = async (username, password) => {
     const URL = `mongodb+srv://${username}:${password}@synchomecluster.p8a4wyk.mongodb.net/?retryWrites=true&w=majority`

  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });

    console.log("database connected");
  } catch (error) {
    console.log("Error database connection ", error);
  }
};

export default Connection;
