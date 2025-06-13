import  { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import AttendanceTable from "../components/AttendanceTable";
import ProgressBars from "../components/Progressbars";
import ActivityFeed from "../components/ActivityFeed";
import BarChart from "../components/BarChart";

const MarkAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [activities, setActivities] = useState([]);
  // const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axiosInstance.get("/classes");
        setClasses(res.data);
        if (res.data.length > 0 && selectedClass !== res.data[0]._id) {
          setSelectedClass(res.data[0]._id);
        }
      } catch (err) {
        setError("Failed to load classes.");
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/classes/${selectedClass}/students`);
        setStudents(res.data);
      } catch (err) {
        setError("Failed to load students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedClass]);

  const fetchAttendanceSummary = async () => {
    try {
      const res = await axiosInstance.get("/attendance/summary");
      setAttendanceSummary(res.data);

      // Prepare line chart data from attendance summary
      const labels = res.data.map((cls) => cls.name);
      const data = {
        labels,
        datasets: [
          {
            label: "Attendance %",
            data: res.data.map((cls) => cls.attendance),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
      setLineChartData(data);
    } catch (err) {
      console.error("Failed to fetch attendance summary:", err);
    }
  };

  useEffect(() => {
    fetchAttendanceSummary();
  }, []);

  const handleSubmit = async (attendanceData) => {
    try {
      // Transform attendanceData object to array of {studentId, status}
      const attendanceArray = Object.entries(attendanceData).map(([studentId, status]) => ({
        studentId,
        status,
      }));

      await axiosInstance.post("/attendance/mark", {
        classId: selectedClass,
        date,
        attendance: attendanceArray,
      });

      setSuccessMessage("Attendance marked successfully.");
      setError(null);

      // Update attendance summary, activities, and line chart data
      fetchAttendanceSummary();
      setActivities((prev) => [
        { message: `Attendance marked for class ${selectedClass} on ${date}` },
        ...prev,
      ]);
    } catch (err) {
      setError("Failed to submit attendance.");
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Class:</label>
        <select
          value={selectedClass || ""}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {loading ? (
        <div>Loading students...</div>
      ) : (
        <AttendanceTable
          students={students}
          onSubmit={handleSubmit}
        />
      )}

      <ProgressBars classes={attendanceSummary} />
      {/* <LineChart data={lineChartData} /> */}
      <ActivityFeed activities={activities} />
    </div>
  );
};

export default MarkAttendance;
