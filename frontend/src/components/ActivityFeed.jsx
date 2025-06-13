import React from "react";
import { Clock } from "lucide-react";

const ActivityFeed = ({ activities }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <p>{activity.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
