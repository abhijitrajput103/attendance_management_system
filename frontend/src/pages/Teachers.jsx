import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersRes, classesRes] = await Promise.all([
          axiosInstance.get("/users/teachers"),
          axiosInstance.get("/classes"),
        ]);
        setTeachers(teachersRes.data);
        setClasses(classesRes.data);
      } catch (err) {
        setError("Failed to fetch teachers or classes.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading user and class data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User and Class Management</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Teachers</h3>
        {teachers.length === 0 ? (
          <p>No teachers found.</p>
        ) : (
          <ul className="list-disc list-inside">
            {teachers.map((teacher) => (
              <li key={teacher.id}>
                {teacher.name} ({teacher.email})
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Classes</h3>
        {classes.length === 0 ? (
          <p>No classes found.</p>
        ) : (
          <ul className="list-disc list-inside">
            {classes.map((cls) => (
              <li key={cls.id}>
                {cls.name} - {cls.description || "No description"}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Teachers;
