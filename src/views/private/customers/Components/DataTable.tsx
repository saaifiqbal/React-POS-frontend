import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { getCustomers } from "../../../../server/customers";

export default function DataTable() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();

  const getCustomerList = useCallback(async () => {
    await dispatch(
      getCustomers(
        dispatch,
        () => {},
        () => {}
      )
    );
  }, [dispatch]);
  useEffect(() => {getCustomerList()}, [getCustomerList]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 250,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Photo",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 260,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "Actions",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 260,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", email: "Demo@mail.com" },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      email: "Demo@mail.com",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      email: "Demo@mail.com",
    },
    { id: 4, lastName: "Stark", firstName: "Arya", email: "Demo@mail.com" },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      email: "Demo@mail.com",
    },
    { id: 6, lastName: "Melisandre", firstName: null, email: "Demo@mail.com" },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      email: "Demo@mail.com",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      email: "Demo@mail.com",
    },
    { id: 9, lastName: "Roxie", firstName: "Harvey", email: "Demo@mail.com" },
  ];
  return (
    <Container sx={{ my: 10 }}>
      <Box sx={{ width: "94vw" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          // disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          // disableCheckboxSelection
          // disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
}
