import React from "react";

const AttendanceReportTable = ({ attendanceRecords }) => {
  if (!attendanceRecords || attendanceRecords.length === 0) {
    return <p>No attendance records available.</p>;
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-4 py-2">Class</th>
          <th className="border px-4 py-2">Date</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {attendanceRecords.map((record, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{record.className || "N/A"}</td>
            <td className="border px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
            <td className="border px-4 py-2">{record.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceReportTable;
