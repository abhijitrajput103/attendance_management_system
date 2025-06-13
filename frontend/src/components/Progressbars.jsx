const ProgressBars = ({ classes }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Class Attendance Overview</h2>
      <div className="space-y-2">
        {classes.map((cls, index) => (
          <div key={cls.id ?? cls.name ?? index} className="flex items-center justify-between">
            <div>
              <p>{cls.name}</p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className={`h-full rounded ${
                    cls.attendance >= 90
                      ? "bg-green-500"
                      : cls.attendance >= 70
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${cls.attendance}%` }}
                ></div>
              </div>
            </div>
            <p className="text-right font-semibold">
              {cls.attendance}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;