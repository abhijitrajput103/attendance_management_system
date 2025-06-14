import Class from '../models/ClassModel.js';
import User from '../models/UserModel.js';

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const students = await User.find({ classId, role: "student" }).populate('classId', 'name');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addClass = async (req, res) => {
  const { name } = req.body;

  const existing = await Class.findOne({ name: name.trim() });
  if (existing) {
    return res.status(400).json({ message: "Class already exists" });
  }

  const newClass = new Class({ name: name.trim() });
  await newClass.save();
  res.status(201).json(newClass);
};

export const updateClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { name, teacherId } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { name, teacherId },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const deletedClass = await Class.findByIdAndDelete(classId);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
