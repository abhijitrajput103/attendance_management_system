import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import Class from "../models/ClassModel.js";

config();

const seedClasses = [
  {
    name: "Class 11 - A",
    teacherId: null,
  },
  {
    name: "Class 11 - B",
    teacherId: null,
  },
  {
    name: "Class 12 - A",
    teacherId: null,
  },
  {
    name: "Class 12 - B",
    teacherId: null,
  },
  {
    name: "Computer Science - XI",
    teacherId: null,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Class.insertMany(seedClasses);
    console.log("Class data seeded successfully.");
  } catch (error) {
    console.error("Error seeding classes:", error);
  }
};

seedDatabase();
