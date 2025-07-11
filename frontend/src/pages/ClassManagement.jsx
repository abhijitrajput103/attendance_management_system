import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssignTeacher, setShowAssignTeacher] = useState(false);
  const [assignClassId, setAssignClassId] = useState("");
  const [assignTeacherId, setAssignTeacherId] = useState("");

  const [newClassName, setNewClassName] = useState("");

  const [editClassId, setEditClassId] = useState(null);
  const [editClassName, setEditClassName] = useState("");
  const [editTeacherId, setEditTeacherId] = useState("");

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/classes");
      setClasses(response.data);
      setError(null);
    } catch {
      setError("Failed to fetch classes.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get("/users/teachers");
      setTeachers(response.data);
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const handleAddClass = async () => {
  if (!newClassName.trim()) {
    setError("Class name is required.");
    return;
  }
  try {
    await axiosInstance.post("/classes", { name: newClassName });
    toast.success("Class added!");
    setNewClassName("");
    fetchClasses();
    setError(null);
  } catch (err) {
    if (err.response?.status === 400 && err.response?.data?.message === "Class already exists") {
      toast.error("Class already exists!");
    } else {
      toast.error("Failed to add class.");
    }
  }
};


  const startEditClass = (cls) => {
    setEditClassId(cls._id);
    setEditClassName(cls.name);
    setEditTeacherId(cls.teacherId || "");
  };

  const cancelEdit = () => {
    setEditClassId(null);
    setEditClassName("");
    setEditTeacherId("");
    setError(null);
  };

  const handleUpdateClass = async () => {
    if (!editClassName.trim()) {
      setError("Class name is required.");
      return;
    }
    try {
      await axiosInstance.put(`/classes/${editClassId}`, {
        name: editClassName,
        teacherId: editTeacherId,
      });
      cancelEdit();
      fetchClasses();
    } catch {
      setError("Failed to update class.");
    }
  };

  const handleDeleteClass = async (classId) => {
    if (!window.confirm("Are you sure you want to delete this class?")) {
      return;
    }
    try {
      await axiosInstance.delete(`/classes/${classId}`);
      fetchClasses();
    } catch {
      setError("Failed to delete class.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Class Management</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add New Class</h3>
        <input
          type="text"
          placeholder="Class Name"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddClass}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Class
        </button>
      </div>

      {loading ? (
        <div>Loading classes...</div>
      ) : classes.length === 0 ? (
        <div>No classes found.</div>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Teacher</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls._id}>
                  <td className="border border-gray-300 p-2">
                    {editClassId === cls._id ? (
                      <input
                        type="text"
                        value={editClassName}
                        onChange={(e) => setEditClassName(e.target.value)}
                        className="border p-1 w-full"
                      />
                    ) : (
                      cls.name
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {editClassId === cls._id ? (
                      <select
                        value={editTeacherId}
                        onChange={(e) => setEditTeacherId(e.target.value)}
                        className="border p-1 w-full"
                      >
                        <option value="">Select a teacher</option>
                        {teachers.map((teacher) => (
                          <option key={teacher._id} value={teacher._id}>
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      cls.teacherId
                        ? typeof cls.teacherId === "object"
                          ? cls.teacherId.name
                          : (teachers.find((t) => t._id === cls.teacherId)?.name || "Assigned")
                        : "Unassigned"

                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {editClassId === cls._id ? (
                      <>
                        <button
                          onClick={handleUpdateClass}
                          className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditClass(cls)}
                          className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClass(cls._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showAssignTeacher && (
            <div className="mt-6 p-4 border border-gray-300 rounded">
              <h3 className="text-xl font-semibold mb-4">Assign Teacher to Class</h3>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Select Class</label>
                <select
                  value={assignClassId}
                  onChange={(e) => setAssignClassId(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Select a class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Select Teacher</label>
                <select
                  value={assignTeacherId}
                  onChange={(e) => setAssignTeacherId(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={async () => {
                  if (!assignClassId || !assignTeacherId) {
                    setError("Please select both class and teacher.");
                    return;
                  }
                  try {
                    await axiosInstance.put(`/classes/${assignClassId}`, {
                      teacherId: assignTeacherId,
                    });
                    setShowAssignTeacher(false);
                    setAssignClassId("");
                    setAssignTeacherId("");
                    fetchClasses();
                    setError(null);
                  } catch  {
                    setError("Failed to assign teacher.");
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Assign
              </button>
              <button
                onClick={() => {
                  setShowAssignTeacher(false);
                  setAssignClassId("");
                  setAssignTeacherId("");
                  setError(null);
                }}
                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClassManagement;
