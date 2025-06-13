import { useState } from "react";

const AttendanceTable = ({ students, onSubmit }) => {
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(attendanceStatus);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th>STUDENT</th>
            <th>CLASS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.classId?.name || "N/A"}</td>
              <td>
                <label className="mr-4">
                  <input
                    type="radio"
                    name={`status-${student._id}`}
                    value="present"
                    checked={attendanceStatus[student._id] === "present"}
                    onChange={() => handleStatusChange(student._id, "present")}
                    required
                  />
                  Present
                </label>
                <label>
                  <input
                    type="radio"
                    name={`status-${student._id}`}
                    value="absent"
                    checked={attendanceStatus[student._id] === "absent"}
                    onChange={() => handleStatusChange(student._id, "absent")}
                    required
                  />
                  Absent
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Attendance
        </button>
      </div>
    </form>
  );
};

export default AttendanceTable;
