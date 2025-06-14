import User from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Controller to get users with role "teacher"
export const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password").populate("classId");
    res.json(teachers);
  } catch (error) {
    console.error("Error in getTeachers:", error);
    res.status(500).json({ message: "Server error fetching teachers" });
  }
};

// Controller to get users with role "student"
export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password").populate("classId");
    res.json(students);
  } catch (error) {
    console.error("Error in getStudents:", error);
    res.status(500).json({ message: "Server error fetching students" });
  }
};

//Login controller 
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("classId");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token, user });
};

//Singup Controller
export const signupController = async (req, res) => {
  const { name, email, password, role, classId } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    classId: role === "student" ? classId : undefined,
    classId: role === "teacher" ? classId : undefined,
  });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(201).json({ token, user: newUser });
}

//Auth Check
export const authCheck = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Not authorized" });
  }
  try {
    const user = await User.findById(req.user.id).populate("classId");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in auth check:", error);
    res.status(500).json({ msg: "Server error" });
  }
}

//Get All Users
export const getUsers =  async (req, res) => {
  const users = await User.find().populate("classId");
  res.json(users);
}