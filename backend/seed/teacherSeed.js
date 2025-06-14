import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

config();

const classIds = [
  "684d52bbefd0311f00817250",
  "684d52c0efd0311f00817255",
  "684d7aed6e83f9ad0498faff",
  "684d7ae76e83f9ad0498fafa",
  "684d7ae16e83f9ad0498faf5",
  "684d7ada6e83f9ad0498faf0",
];

const seedUsers = [];

let count = 1;

for (let i = 0; i < classIds.length; i++) {
  for (let j = 0; j < 5; j++) {
    const username = `teacher${count}`;
    const hashedPassword = await bcrypt.hash(username, 10);

    seedUsers.push({
      name: `teacher ${count}`,
      email: `${username}@gmail.com`,
      password: hashedPassword,
      role: "teacher",
      classId: classIds[i],
    });
    count++;
  }
}

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("✅ Database seeded successfully with hashed passwords.");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

seedDatabase();
