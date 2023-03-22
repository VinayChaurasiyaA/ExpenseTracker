import React from "react";
import "boxicons";

import { default as api } from "../store/apiSlice";
// const obj = [
//   {
//     name: "Savings",
//     color: "#f9c74f",
//   },
//   {
//     name: "Investment",
//     color: "#f9c74f",
//   },
//   {
//     name: "Expenses",
//     color: "#f9c74f",
//   },
// ];
const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transaction;
  const handler = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteTransaction({ _id: e.target.dataset.id });
    // console.log(e.target.dataset.id);
  };

  if (isFetching) {
    Transaction = <div>Fetching</div>;
  } else if (isSuccess) {
    Transaction = data.map((val, index) => (
      <Transactions key={index} category={val} handler={handler} />
    ));
  } else if (isError) {
    Transaction = <div>Error</div>;
  }
  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl"> Histroy</h1>
      {
        Transaction
        // obj.map((val, index) => (
        //   <Transaction category={val} key={index} />
        // ))
      }
    </div>
  );
};
function Transactions({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "black"} ` }}
    >
      <button className="px-3" onClick={handler}>
        <box-icon
          color={category.color ?? "black"}
          size="15px"
          name="trash"
          data-id={category._id ?? ""}
        />
      </button>
      <span className="w-full block">{category.name ?? ""}</span>
    </div>
  );
}
export default List;
