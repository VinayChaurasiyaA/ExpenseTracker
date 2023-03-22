import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { default as api } from "../store/apiSlice";
import { chart_Data  , getTotal} from "../helper/helper";
import Labels from "./Labels";
Chart.register(ArcElement);
const Graph = () => {
  // const config = {
  //   data: {
  //     datasets: [
  //       {
  //         data: [300, 50, 100],
  //         backgroundColor: [
  //           "rgb(255, 22, 10)",
  //           "rgb(165, 55, 253)",
  //           "rgb(255, 205, 86)",
  //         ],
  //         hoverOffset: 4,
  //         borderRadius: 30,
  //         spacing: 10,
  //       },
  //     ],
  //   },
  //   options: {
  //     cutout: 115,
  //   },
  // };
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

  let graphData;
  if (isFetching) {
    graphData = <div>Fetching</div>;
  } else if (isSuccess) {
    // console.log(chart_Data(data))
    graphData = <Doughnut {...chart_Data(data)}></Doughnut>
    // console.log(getLables(data, "type"));
    // Transaction = getLables(data, "type").map((val, index) => (
    //   <LabelComponents key={index} data={val} />
    // ));
  } else if (isError) {
    graphData = <div>Error</div>;
  }
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
         {graphData}
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">₹{getTotal(data) ?? 0}</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {/* {Labels} */}
          <Labels />
        </div>
      </div>
    </div>
  );
};

export default Graph;
