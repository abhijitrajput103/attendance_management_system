import { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
import ProgressBars from "../components/Progressbars";
import ActivityFeed from "../components/ActivityFeed";
import { axiosInstance } from "../lib/axios";

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axiosInstance.get("/dashboard");
        setClasses(res.data.classes);
        setChartData(res.data.chartData);
        setActivities(res.data.activities);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column */}
      <div>
        <ProgressBars classes={classes} />
      </div>

      {/* Right Column */}
      <div>
        {chartData && (
          <div style={{ height: '400px', width: '100%' }}>
            <BarChart data={chartData} />
          </div>
        )}
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;
