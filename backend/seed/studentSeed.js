import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/UserModel.js";

config();

const seedUsers = [
  {
    name: "Deepika Padukone",
    email: "deepika.padukone@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "Alia Bhatt",
    email: "alia.bhatt@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "Kiara Advani",
    email: "kiara.advani@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "Kriti Sanon",
    email: "kriti.sanon@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "Shraddha Kapoor",
    email: "shraddha.kapoor@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "Virat Kohli",
    email: "virat.kohli@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "Rohit Sharma",
    email: "rohit.sharma@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "KL Rahul",
    email: "kl.rahul@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "Shubman Gill",
    email: "shubman.gill@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
  {
    name: "Hardik Pandya",
    email: "hardik.pandya@example.com",
    password: "123456",
    role: "student",
    classId: null,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully with students.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
