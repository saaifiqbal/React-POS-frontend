/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridFilterModel,
} from "@mui/x-data-grid";

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  loading: boolean;
  onPaginationChange: (model: any) => void;
  onSortChange: (model: any) => void;
  filterChange: (model: GridFilterModel) => void;
  filterModel: GridFilterModel;
  total: number;
  attribute?: {
    disableColumnSelector?: boolean;
    disableDensitySelector?: boolean;
    disableColumnFilter?: boolean;
  };
  customOperator: any[];
}

const DataTable: React.FC<DataTableProps> = ({
  columns = [],
  rows = [],
  loading = false,
  onPaginationChange,
  onSortChange,
  filterChange,
  filterModel,
  total = 0,
  attribute = {
    disableColumnSelector: true,
    disableDensitySelector: true,
    disableColumnFilter: true,
  },
  customOperator = [],
}) => {
  // Apply custom operators to specific columns
  const updatedColumns: GridColDef[] = columns.map((column) => {
    if (column.field === "first_name") {
      return {
        ...column,
        filterOperators: customOperator,
      };
    }
    return column;
  });

  return (
    <Fragment>
      <div className="p-3">
        <Box sx={{ width: "100%", height: "50vh", minHeight: 411 }}>
          <DataGrid
            {...attribute}
            rows={rows}
            columns={updatedColumns}
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
            filterMode="server"
            filterModel={filterModel}
            onFilterModelChange={filterChange}
            loading={loading}
          />
        </Box>
      </div>
    </Fragment>
  );
};

export default DataTable;
