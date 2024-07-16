
import {
    getGridStringOperators,
    GridFilterItem,
    GridFilterOperator,
  } from '@mui/x-data-grid';
  
  // Define a custom operator for filtering strings that contains a substring (case insensitive)
  const customStringOperators: GridFilterOperator[] = [
    {
      label: 'contains',
      value: 'contains',
      getApplyFilterFn: (filterItem: GridFilterItem) => {
        if (!filterItem.value || !filterItem.columnField) {
          return null;
        }
        return ({ value }) => {
          return value.toString().toLowerCase().includes(filterItem.value.toLowerCase());
        };
      },
      InputComponent: getGridStringOperators()[0].InputComponent,
    },
    // Add more custom operators as needed
  ];
  
  export { customStringOperators };
  