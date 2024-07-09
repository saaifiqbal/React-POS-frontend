/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback, useEffect, useState } from "react";
import DataTable from "../../../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../store/thunks/customer";
import { GridFilterModel } from "@mui/x-data-grid";

// import DataTable from "./Components/DataTable";

function Customers() {
  const dispatch = useDispatch();
  // tableElement
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phone_number",
      headerName: "Contact Number",
      width: 250,
    },
    {
      field: "zip_code",
      headerName: "Zip Code",
      description: "This column has a value getter and is not sortable.",
      width: 260,
    },
    {
      field: "Actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 260,
      valueGetter: (value, row) => `${row.first_name || ""} `,
    },
  ];
  const customersList = useSelector((state) => state.customers);
  const [params, setParams] = useState({
    page: 0,
    pageSize: 5,
    field: "id",
    sort: "asc",
    search: "",
  });
  // methods
  const getCustomerList = useCallback(() => {
    dispatch(
      fetchCustomers({
        params: params,
        onSuccess: () => {
          console.log("Get Customer Successfully");
        },
        onError: () => {
          console.log("Get Customer Failed");
        },
      })
    );
  }, [dispatch, params]);

  useEffect(() => {
    getCustomerList();
  }, [getCustomerList]);

  const onPaginationChange = (event: any, field: any) => {
    console.log("Pagination Meta Change ", event, field);
    setParams((prev) => ({ ...prev, ...event }));
  };
  const onSortChange = (event: any) => {
    setParams((prev) => ({
      ...prev,
      field: event[0]?.field ?? "id",
      sort: event[0]?.sort ?? "asc",
    }));
    console.log("params Meta Change ", params);
  };
  const filterChange = ({ items, quickFilterValues }) => {
    console.log("event filter", items, quickFilterValues);
    setParams((prev) => ({
      ...prev,
      search: quickFilterValues[0] ?? "",
    }));
  };
  return (
    <div className="w-full">
      {/* <DataTable /> */}
      <DataTable
        columns={columns}
        rows={customersList.customers}
        onPaginationChange={onPaginationChange}
        total={customersList.total}
        loading={customersList.isLoading}
        onSortChange={onSortChange}
        filterChange={filterChange}
      />
    </div>
  );
}

export default Customers;
