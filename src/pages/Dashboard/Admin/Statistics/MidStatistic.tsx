import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BiDotsVerticalRounded } from "react-icons/bi";

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
const MidStatistic = () => {
    const [activeActionButton, setActiveActionButton] = useState<number>(-1);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-8">
        {dashboardChartData.map((chartData, ind) => {
          const { title, chartType, series, options, actionIconData } =
            chartData;
          const isOpen = ind === activeActionButton;
          return (
            <div
              key={ind}
              className="p-4 md:p-6 rounded-md bg-gray-100  space-y-6"
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
    );
};

export default MidStatistic;