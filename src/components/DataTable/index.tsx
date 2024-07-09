/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Fragment } from "react/jsx-runtime";

const DataTable = ({
  columns,
  rows,
  loading,
  onPaginationChange,
  onSortChange,
  filterChange,
  filterModel,
  total,
}: any) => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 9,
  });
  return (
    <Fragment>
      <Container sx={{ my: 10 }}>
        <Box sx={{ width: "95vw", height: "60vh", minHeight:411 }}>
          <DataGrid
            {...data}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pagination
            paginationMode="server"
            pageSizeOptions={[5, 10, 20, 50, 100]}
            slots={{ toolbar: GridToolbar }}
            rowCount={total}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
            }}
            sortingMode="server"
            onSortModelChange={onSortChange}
            onPaginationModelChange={onPaginationChange}
            disableColumnSelector
            disableDensitySelector
            filterMode="server"
            filterModel={filterModel}
            onFilterModelChange={filterChange}
            loading={loading}

            // disableColumnFilter
          />
        </Box>
      </Container>
    </Fragment>
  );
};

export default DataTable;
