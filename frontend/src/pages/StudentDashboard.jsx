import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";

const StudentDashboard = () => {
  const { authUser: user } = useAuthStore();
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get("/attendance/report");
        setAttendanceData(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch attendance data");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [user]);

  // Calculate attendance summary
  const totalPresent = attendanceData.filter((entry) => entry.status === "Present").length;
  const totalAbsent = attendanceData.filter((entry) => entry.status === "Absent").length;
  const attendanceRate = attendanceData.length > 0 ? Math.round((totalPresent / attendanceData.length) * 100) : 0;

  return (
    <div>
      {user && user.name && user.name.length > 0 && (
        <>
          {/* Main Content */}
          <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
            {/* Greeting */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-1">Hi, {user.name} !</h2>
              <p className="text-gray-600">Welcome back to your student dashboard.</p>
            </section>

            {loading ? (
              <p>Loading attendance data...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                {/* Attendance Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm uppercase text-gray-500 tracking-wider">Total Present</h3>
                    <p className="mt-2 text-3xl font-bold text-green-600">{totalPresent} Days</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm uppercase text-gray-500 tracking-wider">Total Absent</h3>
                    <p className="mt-2 text-3xl font-bold text-red-500">{totalAbsent} Days</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm uppercase text-gray-500 tracking-wider">Attendance Rate</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-600">{attendanceRate}%</p>
                  </div>
                </section>

                {/* Recent Attendance Log */}
                <section className="bg-white p-6 rounded-lg shadow mb-8">
                  <h3 className="text-lg font-semibold mb-4">Recent Attendance</h3>
                  <div className="space-y-4">
                    {attendanceData.slice(0, 5).map((entry, index) => {
                      let color = "bg-gray-100 text-gray-800";
                      if (entry.status === "Present") color = "bg-green-100 text-green-800";
                      else if (entry.status === "Absent") color = "bg-red-100 text-red-800";
                      else if (entry.status === "Late") color = "bg-yellow-100 text-yellow-800";

                      return (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
                            {entry.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </>
            )}

            {/* Profile Info */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Your Info</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Name</dt>
                  <dd className="font-medium">{user.name}</dd>
                </div>
                {/* <div>
                  <dt className="text-sm text-gray-500">Roll No</dt>
                  <dd className="font-medium">{user._id}</dd>
                </div> */}
                <div>
                  <dt className="text-sm text-gray-500">Class</dt>
                  <dd className="font-medium">{user.classId ? user.classId.name : ''}</dd>
                </div>
              </dl>
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
