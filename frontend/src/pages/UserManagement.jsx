import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("teachers");
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teachers or students
  const fetchUsers = async (role) => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = role === "teachers" ? "/users/teachers" : "/users/students";
      const response = await axiosInstance.get(endpoint);
      setUsers(response.data);
    } catch (err) {
      setError(`Failed to fetch ${role}.`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all classes once
  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get("/classes");
      setClasses(response.data);
    } catch (err) {
      console.error("Failed to fetch classes", err);
    }
  };

  useEffect(() => {
    fetchUsers(activeTab);
  }, [activeTab]);

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === "teachers" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("teachers")}
        >
          Teachers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "students" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>
      </div>

      {loading ? (
        <div>Loading {activeTab}...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : users.length === 0 ? (
        <div>No {activeTab} found.</div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Class</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              let className = "N/A";
              if (activeTab === "teachers") {
                className = classes.find((cls) => cls.teacherId === user._id)?.name || "N/A";
              } else {
                className = user.classId
                  ? classes.find((cls) => cls._id === user.classId?._id)?.name || "N/A"
                  : "N/A";
              }

              return (
                <tr key={user._id}>
                  <td className="border border-gray-300 p-2">{user.name}</td>
                  <td className="border border-gray-300 p-2">{user.email}</td>
                  <td className="border border-gray-300 p-2">{className}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
