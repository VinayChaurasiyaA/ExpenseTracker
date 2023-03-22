import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// apiSlice is using RTK query where it fetches the data from the database
const baseURI = "http://localhost:5000";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      // this is making get request
      query: () => "/api/categories",
      providesTags: ['categories'],
    }),


    // get labels
    getLabels: builder.query({
      query: () => "/api/labels",
      providesTags: ['transaction'],
    }),

    // post transaction
    addTransactions: builder.mutation({
      query: (initialTransaction) => ({
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ['transaction'],
    }),
    //detele Transaction
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        url: "/api/transaction",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ['transaction'],
    }),
  }),
});
export default apiSlice;
