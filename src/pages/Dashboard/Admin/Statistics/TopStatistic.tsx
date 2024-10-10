import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const dashboardTopData = [
    {
      title: "Total Revenue",
      subtitle: "Revenue Today",
      value: 256,
      color: "#FF5733",
      progress: 75,
      actionIconData: [
        "Action",
        "Another Action",
        "Something Else",
        "Separated Link",
      ],
    },
    {
      title: "Sales Analytics",
      subtitle: "Monthly Sales",
      value: 8451,
      color: "#28A745",
      progress: 50,
      actionIconData: ["View Details", "Download Report", "Settings", "Help"],
    },
    {
      title: "Statistics",
      subtitle: "User Growth",
      value: 4569,
      color: "#007BFF",
      progress: 85,
      actionIconData: ["View Chart", "Export Data", "Settings", "Help"],
    },
    {
      title: "Daily Sales",
      subtitle: "Sales Today",
      value: 185,
      color: "#FFC107",
      progress: 60,
      actionIconData: ["View Details", "Generate Invoice", "Settings", "Help"],
    },
  ];

const TopStatistic = () => {
    const [activeActionButton, setActiveActionButton] = useState<number>(-1);

    return (
        
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {dashboardTopData.map((topData, ind) => {
          const { title, subtitle, value, progress, color, actionIconData } =
            topData;
          const isOpen = ind === activeActionButton;
          return (
            <div
              key={ind}
              className="p-4 md:p-6 rounded-md bg-secondary space-y-6"
            >
              {/* title */}
              <div className="flex justify-between items-center gap-3 relative">
                <h3 className="text-primary font-semibold text-sm">{title}</h3>
                <button
                  onClick={() => {
                    setActiveActionButton(
                      ind === activeActionButton ? -1 : ind
                    );
                  }}
                  className="text-text-color text-lg"
                >
                  <BiDotsVerticalRounded />
                </button>

                {/* action link */}
                <ul
                  className={`${
                    isOpen ? "top-[25px] visible" : "top-[50px] invisible"
                  } my-transition absolute z-30  right-0 flex flex-col bg-primary rounded-md h-fit w-auto lg:w-[180px] ring-1 ring-text-color/20 *:w-full p-1 text-sm`}
                >
                  {actionIconData.map((actionLink, ind) => {
                    return (
                      <li key={ind}>
                        <button className="my-transition px-5 py-2 text-text-color hover:bg-primary hover:text-blue-400 w-full flex items-start text-left justify-start">
                          {actionLink}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* content */}
              <div className="flex justify-between items-center gap-3">
                {/* circle progress */}
                <div className="relative size-24">
                  <svg
                    className="size-full -rotate-90"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-current text-gray-500"
                      strokeWidth="2"
                    ></circle>
                    {/* Progress Circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      style={{ color }}
                      className={`stroke-current `}
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset={100 - progress}
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  {/* Percentage Text */}
                  <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <span
                      style={{ color }}
                      className="text-center text-2xl font-normal "
                    >
                      {progress}%
                    </span>
                  </div>
                </div>

                {/* content */}
                <div className="flex flex-col space-y-2 text-right">
                  <span className="text-primary text-2xl">{value}</span>
                  <p className="text-text-color text-sm">{subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </section>
     
    );
};

export default TopStatistic;