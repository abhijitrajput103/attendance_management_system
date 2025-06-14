import  { useState, useEffect } from "react";
import AttendanceReportTable from "../components/AttendanceReportTable";
import { axiosInstance } from "../lib/axios";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceReport = async () => {
      try {
        const res = await axiosInstance.get("/attendance/report");
        console.log("Attendance report response data:", res.data);
        if (Array.isArray(res.data)) {
          setAttendanceData(res.data);
        } else {
          console.error("Unexpected attendance report data format:", res.data);
          setError("Unexpected data format received from server.");
          setAttendanceData([]);
        }
      } catch (err) {
        setError("Failed to fetch attendance report.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceReport();
  }, []);

  if (loading) return <div>Loading attendance report...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance Report</h2>
      {attendanceData.length === 0 ? (
        <p>No attendance data available.</p>
      ) : (
        <AttendanceReportTable attendanceRecords={attendanceData} />
      )}
    </div>
  );
};

export default AttendanceReport;
