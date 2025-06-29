// import React from "react";
// import { useContext, useEffect } from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Bar, Doughnut, Line } from "react-chartjs-2";
// import { useLocation } from "react-router-dom";
// import Header from "../Other/header";
// import { ThemeContext } from "../../Context/AppContext";

// // Set default chart settings
// defaults.maintainAspectRatio = false;
// defaults.responsive = true;
// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 35;

// // Sample data

// const DashboardChart = () => {
//   const location = useLocation();
//   const { item } = location.state || {};
//   const { theme, updated_data } = useContext(ThemeContext);
//   useEffect(() => {}, [updated_data, theme]);
//   defaults.plugins.legend.labels.color = theme === "dark" ? "black" : "#F1F5F9";
  
//   defaults.plugins.legend.labels.font = {
//   size: 20, // or whatever size you want
// };
  

//   const sourceData = [
//     { label: "activeTasks", value: item.taskCount?.activeTasks ?? 0 },
//     { label: "completedTasks", value: item.taskCount?.completedTasks ?? 0 },
//     { label: "failedTasks", value: item.taskCount?.failedTasks ?? 0 },
//     { label: "newTasks", value: item.taskCount?.newTasks ?? 0 },
//   ];

//   console.log("item.username", item);
//   return (
//     <div className={`${theme}   w-screen h-screen   overflow-x-hidden p-6 `}>
//       <Header></Header>

//       <div className="dataCard categoryCard" style={{ height: "500px" }}>
//         <Doughnut
//           data={{
//             labels: sourceData.map((data) => data.label),
//             datasets: [
//               {
//                 label: "Count",
//                 data: sourceData.map((data) => data.value),
                
//                 backgroundColor: [
//                   "rgba(43, 63, 229, 0.8)",
//                   "rgba(250, 192, 19, 0.8)",
//                   "rgba(253, 135, 135, 0.8)",
//                   "rgba(23, 15, 13, 0.8)",
//                 ],
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: `Performances of ${item.username}`,
//                 color: theme === "dark" ? "#334155" : "#F1F5F9",
//               },
//             },
//             // legend: {
//             //   labels: {
//             //     color: "blue" , // ← LEGEND LABEL text color
//             //   },
//             // },
//           }}
//         />
//       </div>

//       <div className="info">

//         <h1>Total Tasks : {item.tasks.length}</h1>
//         <h1>Total Active Tasks : {item.taskCount?.activeTasks}</h1>
//         <h1>Total Completed Tasks : {item.taskCount?.completedTasks}</h1>

//          <h1>Total Failed Tasks : {item.taskCount?.failedTasks}</h1>

//         <h1>Total New Tasks : {item.taskCount?.newTasks}</h1>

//       </div>
//     </div>
//   );
// };

// export default DashboardChart;


// import React from "react";
// import { useContext, useEffect } from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Bar } from "react-chartjs-2"; // Changed: Doughnut → Bar
// import { useLocation } from "react-router-dom";
// import Header from "../Other/header";
// import { ThemeContext } from "../../Context/AppContext";

// // Set default chart settings
// defaults.maintainAspectRatio = false;
// defaults.responsive = true;
// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 35;

// const DashboardChart = () => {
//   const location = useLocation();
//   const { item } = location.state || {};
//   const { theme, updated_data } = useContext(ThemeContext);

//   useEffect(() => {}, [updated_data, theme]);

//   defaults.plugins.legend.labels.color = theme === "dark" ? "black" : "#F1F5F9";
//   defaults.plugins.legend.labels.font = {
//     size: 25,
//   };

  
//   const sourceData = [
//     { label: "activeTasks", value: item.taskCount?.activeTasks ?? 0 },
//     { label: "completedTasks", value: item.taskCount?.completedTasks ?? 0 },
//     { label: "failedTasks", value: item.taskCount?.failedTasks ?? 0 },
//     { label: "newTasks", value: item.taskCount?.newTasks ?? 0 },
//   ];

//   return (
//     <div className={`${theme} w-screen h-screen overflow-x-hidden p-6`}>
//       <Header />

//       <div className="dataCard categoryCard" style={{ height: "500px" }}>
//         <Bar
//           data={{
//             labels: sourceData.map((data) => data.label),
//             datasets: [
//               {
//                 label: "Count",
//                 data: sourceData.map((data) => data.value),
//                 backgroundColor: [
//                   "rgba(43, 63, 229, 0.8)",
//                   "rgba(250, 192, 19, 0.8)",
//                   "rgba(253, 135, 135, 0.8)",
//                   "rgba(23, 15, 13, 0.8)",
//                 ],
//                 borderRadius: 5,
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: `Performances of ${item.username}`,
//                 color: theme === "dark" ? "#334155" : "#F1F5F9",
//               },
//             },
//           }}
//         />
//       </div>

//       <div className="info">
//         <h1>Total Tasks : {item.tasks.length}</h1>
//         <h1>Total Active Tasks : {item.taskCount?.activeTasks}</h1>
//         <h1>Total Completed Tasks : {item.taskCount?.completedTasks}</h1>
//         <h1>Total Failed Tasks : {item.taskCount?.failedTasks}</h1>
//         <h1>Total New Tasks : {item.taskCount?.newTasks}</h1>
//       </div>
//     </div>
//   );
// };



// export default DashboardChart;


import React, { useContext, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import Header from "../Other/header";
import { ThemeContext } from "../../Context/AppContext";

// Set global chart defaults
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 35;

const DashboardChart = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const { theme, updated_data } = useContext(ThemeContext);

  useEffect(() => {}, [updated_data, theme]);

  defaults.plugins.legend.labels.color = `${theme === "dark" ?   "#1e293b" : "#E2E8F0"}`;
  defaults.plugins.legend.labels.font = {
    size: 20,
    weight: "500",
    family: "Inter",
  };

  const sourceData = [
    { label: "activeTasks", value: item.taskCount?.activeTasks ?? 0 },
    { label: "completedTasks", value: item.taskCount?.completedTasks ?? 0 },
    { label: "failedTasks", value: item.taskCount?.failedTasks ?? 0 },
    { label: "newTasks", value: item.taskCount?.newTasks ?? 0 },
  ];

  return (
    <div className={`${theme} w-screen h-screen overflow-x-hidden p-3`}>
      <Header />

      <div className="dataCard categoryCard" style={{ height: "500px" }}>
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(14, 63, 229, 0.8)" ,
                  "rgba(159, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(23, 15, 13, 0.8)",
                ],
                borderRadius: 6,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: `Performances of ${item.username}`,
                color: theme === "dark" ? "black" : "white",
                font: {
                  size: 26,
                  weight: "bold",
                  family: "Poppins",
                },
                padding: {
                  top: 10,
                  bottom: 20,
                },
              },
              legend: {
                labels: {
                  color: theme === "dark" ? "black" : "white",
                  font: {
                    size: 16,
                    family: "Roboto",
                  },
                },
              },
            },
            scales: {
              x: {
                ticks: {
                  color: theme === "dark" ? "black" : "white",
                  font: {
                    size: 14,
                    weight: "500",
                    family: "Inter",
                  },
                },
                grid: {
                  display: false,
                },
              },
              y: {
                ticks: {
                  color: theme === "dark" ? "black" : "white",
                  font: {
                    size: 14,
                    weight: "500",
                    family: "Inter",
                  },
                },
                grid: {
                  color: theme === "dark" ? "black" : "white",
                  borderDash: [5, 5],
                },
              },
            },
          }}
        />
      </div>

      <div className="info mt-6 space-y-2 text-lg font-medium flex gap-12 justify-between p-3">

        <div>
        <h1>Total Tasks: {item.tasks.length}</h1>
        <h1>Total Active Tasks: {item.taskCount?.activeTasks}</h1>
        <h1>Total Completed Tasks: {item.taskCount?.completedTasks}</h1>
        <h1>Total Failed Tasks: {item.taskCount?.failedTasks}</h1>
        <h1>Total New Tasks: {item.taskCount?.newTasks}</h1>
        </div>
        <div>
            successRate = (completed task / (completed task + failed task)) * 100;

            <h1>
  Success Rate: {((item.taskCount?.completedTasks ?? 0) + (item.taskCount?.failedTasks ?? 0)) > 0
    ? `${(
        (item.taskCount?.completedTasks ?? 0) /
        ((item.taskCount?.completedTasks ?? 0) + (item.taskCount?.failedTasks ?? 0))
      ).toFixed(2) * 100}%`
    : "0%"}
</h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;


