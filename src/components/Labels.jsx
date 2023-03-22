import React from "react";

import { default as api } from "../store/apiSlice";
import { getLables } from "../helper/helper";
// const objects = [
//     {
//         type : "Savings",
//         color : "#f9c74f" ,
//         percent : 45,
//     },
//     {
//         type : "Investment",
//         color : "#9d4edd" ,
//         percent : 20,
//     },
//     {
//         type : "Expense",
//         color : "red" ,
//         percent : 10,
//     }
// ]
const Labels = () => {
  // console.log(api.useGetCategoriesQuery());
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();

  let Transaction;
  if (isFetching) {
    Transaction = <div>Fetching</div>;
  } else if (isSuccess) {
    console.log(getLables(data, "type"));
    Transaction = getLables(data, "type").map((val, index) => (
      <LabelComponents key={index} data={val} />
    ));
  } else if (isError) {
    Transaction = <div>Error</div>;
  }
  return (
    <>
      {
        Transaction
        // data.map((val , index) => (
        //   <LabelComponents key={index} data={val} />
        // ))
      }
    </>
  );
};
function LabelComponents({ data }) {
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-3"
          style={{ backgroundColor: data.color ?? "#f9c74f" }}
        ></div>
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <h3 className="font-bold">{Math.round(data.percent) ?? ""}%</h3>
    </div>
  );
}
export default Labels;
