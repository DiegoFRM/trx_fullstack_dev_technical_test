import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://diego:diego1234@cluster0.wgszsfz.mongodb.net/");
    console.log(">>> DB is connected<<<")
  } catch (error) {
    console.log(error);
  }
};