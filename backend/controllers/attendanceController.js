import Attendance from '../models/AttendanceModels.js';

export const markAttendance = async (req, res) => {
  try {
    const { classId, date, attendance } = req.body;

    // Find existing attendance document for class and date
    let attendanceDoc = await Attendance.findOne({ classId, date });

    if (attendanceDoc) {
      // Update records array
      attendanceDoc.records = attendance.map((record) => ({
        studentId: record.studentId,
        status: record.status.charAt(0).toUpperCase() + record.status.slice(1).toLowerCase(),
      }));
    } else {
      // Create new attendance document
      attendanceDoc = new Attendance({
        classId,
        date,
        records: attendance.map((record) => ({
          studentId: record.studentId,
          status: record.status.charAt(0).toUpperCase() + record.status.slice(1).toLowerCase(),
        })),
      });
    }

    await attendanceDoc.save();

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const studentId = req.user._id;
    console.log("Fetching attendance report for studentId:", studentId);

    // Find attendance documents where records.studentId matches studentId
    const attendanceDocs = await Attendance.find({ "records.studentId": studentId }).populate('classId', 'name');

    // Extract attendance records for the student
    const studentAttendance = attendanceDocs.map((doc) => {
      const record = doc.records.find((r) => r.studentId.toString() === studentId.toString());
      return {
        classId: doc.classId,
        className: doc.classId.name,
        date: doc.date,
        status: record ? record.status : "Absent",
      };
    });

    console.log("Attendance records found:", studentAttendance.length);
    res.json(studentAttendance);
  } catch (error) {
    console.error('Error fetching attendance report:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAttendanceSummary = async (req, res) => {
  try {
    // Aggregate attendance data grouped by classId
    const summary = await Attendance.aggregate([
      {
        $unwind: "$records"
      },
      {
        $group: {
          _id: "$classId",
          totalRecords: { $sum: 1 },
          presentCount: {
            $sum: {
              $cond: [{ $eq: ["$records.status", "Present"] }, 1, 0]
            }
          }
        }
      },
      {
        $lookup: {
          from: "classes",
          localField: "_id",
          foreignField: "_id",
          as: "classInfo"
        }
      },
      {
        $unwind: "$classInfo"
      },
      {
        $project: {
          _id: 0,
          classId: "$_id",
          name: "$classInfo.name",
          attendance: {
            $multiply: [
              { $divide: ["$presentCount", "$totalRecords"] },
              100
            ]
          }
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    console.error('Error fetching attendance summary:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
