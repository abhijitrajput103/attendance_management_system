import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const ClassModel = mongoose.model("Class", ClassSchema);
export default ClassModel;