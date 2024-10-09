import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ReactApexChart from "react-apexcharts";
import TopStatistic from "./TopStatistic";
// type define for chat 
type ChartType = "donut" | "bar" | "line";  

interface DashboardChartData {
  chartType: ChartType;
  title: string;
  options: object; 
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  actionIconData: string[];
}

// statistics mid
const dashboardChartData: DashboardChartData[] = [
  {
    chartType: "donut",
    title: "Daily Sales",
    options: {},
    series: [44, 55, 13, 43],
    actionIconData: [
      "Action",
      "Another Action",
      "Something Else",
      "Separated Link",
    ],
  },
  {
    chartType: "bar",
    title: "Statistic",
    options: {
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            position: "top",
            fontSize: "14px",
          },
        },
      },
      xaxis: {
        categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
      },
    },
    series: [
      {
        data: [12.3, 23.1, 30.1, 33.8, 10.5, 15.2, 8.5],
      },
    ],
    actionIconData: [
      "Action",
      "Another Action",
      "Something Else",
      "Separated Link",
    ],
  },
  {
    chartType: "line",
    title: "Total Revenue",
    options: {
      xaxis: {
        categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
      },
    },
    series: [
      {
        name: "Series A",
        data: [45, 52, 38, 24, 33, 26, 21],
      },
      {
        name: "Series B",
        data: [35, 41, 62, 42, 13, 18, 29],
      },
    ],
    actionIconData: [
      "Action",
      "Another Action",
      "Something Else",
      "Separated Link",
    ],
  },
];

// const dashboardChartData = [
//   {
//     chartType: "donut",
//     title: "Daily Sales",
//     options: {},
//     series: [44, 55, 13, 43],
//     actionIconData: [
//       "Action",
//       "Another Action",
//       "Something Else",
//       "Separated Link",
//     ],
//   },
//   {
//     chartType: "bar",
//     title: "Statistic",
//     options: {
//       plotOptions: {
//         bar: {
//           borderRadius: 5,
//           dataLabels: {
//             position: "top",
//             fontSize: "14px",
//           },
//         },
//       },
//       xaxis: {
//         categories: ["2018", "2019", "2020", "2021", "2022", "2023", "2024"],
//       },
//     },
//     series: [
//       {
//         data: [12.3, 23.1, 30.1, 33.8, 10.5, 15.2, 8.5],
//       },
//     ],
//     actionIconData: [
//       "Action",
//       "Another Action",
//       "Something Else",
//       "Separated Link",
//     ],
//   },
//   {
//     chartType: "line",
//     title: "Total Revenue",

//     options: {
//       xaxis: {
//         categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
//       },
//     },
//     series: [
//       {
//         name: "Series A",
//         data: [45, 52, 38, 24, 33, 26, 21],
//       },
//       {
//         name: "Series B",
//         data: [35, 41, 62, 42, 13, 18, 29],
//       },
//     ],
//     categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
//     actionIconData: [
//       "Action",
//       "Another Action",
//       "Something Else",
//       "Separated Link",
//     ],
//   },
// ];
// statistics bottom
const dashboardUserData = [
  {
    image: "https://avatars.githubusercontent.com/u/130208279?v=4",
    name: "Hammad Sadi",
    email: "john.doe@example.com",
    role: "Admin",
    color: "#007bff",
  },
  {
    image: "https://avatars.githubusercontent.com/u/155248034?v=4",
    name: "Sajjad Hosen Sohan",
    email: "jane.smith@example.com",
    role: "Admin",
    color: "#ffc107",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocLYnptM8nBYuRh7f_SzZpLlwprILeDtzjpjfjwXKA0a840JzRI=s96-c-rg-br100",
    name: "Sahadat Hosen",
    email: "ssar96540@gmail.com",
    role: "Admin",
    color: "#28a745",
  },
  {
    image: "https://avatars.githubusercontent.com/u/155246328?v=4",
    name: "Amir Hosen Antar",
    email: "designimb@gmail.com",
    role: "Admin",
    color: "#007bff",
  },
 
   
];

const Statistics = () => {
  const [activeActionButton, setActiveActionButton] = useState<number>(-1);

  return (
    <>
      {/* total revenue, sales analysics, statistic, daily sales */}
     <TopStatistic></TopStatistic>
      {/* statistics mid */}
      {/* daily sales,  statistic, total revenue */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-8">
        {dashboardChartData.map((chartData, ind) => {
          const { title, chartType, series, options, actionIconData } =
            chartData;
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

              {/* chart */}
              <ReactApexChart
                options={options}
                series={series}
                type={chartType}
                width={"95%"}
              />
            </div>
          );
        })}
      </section>
      {/* statistics bottom */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-8">
        {/* user info */}
        {dashboardUserData.map((userInfoItem, ind) => {
          const { name, email, role, image, color } = userInfoItem;
          return (
            <div
              key={ind}
              className="p-4 md:p-6 rounded-md bg-secondary flex flex-col  text-center justify-center lg:justify-start lg:items-start items-center gap-4 md:gap-6"
            >
              {/* image */}
              <img
                className="size-[70px] rounded-full object-cover"
                src={image}
                alt=""
              />

              {/* content */}
              <div className="flex flex-col justify-center lg:justify-normal text-center space-y-2 md:text-left break-words text-wrap">
                <h5 className="text-primary md:text-lg">{name}</h5>
                <small className="text-text-color text-xs break-words text-wrap lg:max-w-[150px]">
                  {email}
                </small>
                <span
                  style={{ color: color }}
                  className="text-xs font-semibold uppercase"
                >
                  {role}
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Statistics;
