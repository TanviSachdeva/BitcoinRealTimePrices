import React, { useEffect, useState } from "react";
import { useTable, useAsyncDebounce, useSortBy } from "react-table";

import sortIcon from "../src/assets/sort-solid.svg";
import sortUpIcon from "../src/assets/sort-up-solid.svg";
import sortDownIcon from "../src/assets/sort-down-solid.svg";
import { Link } from "react-router-dom";

interface TableProps {
  data: any;
  columns: any;
  tableGridCols: number;
}

// Table component
const DataGrid = ({ data, columns, tableGridCols }: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  const [columnWidthClass, setColumnWidthClass] = useState("col-md-12");
  useEffect(() => {
    setColumnWidthClass(`col-md-${tableGridCols}`);
  }, [tableGridCols]);

  // Render the UI for your table
  return (
    <>
      <div>
        {columns[0] && data[0] ? (
          <div className="row">
            <div className={columnWidthClass}>
              <table {...getTableProps()} className="data-grid">
                <thead>
                  {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          {column.canSort ? (
                            column.isSorted ? (
                              column.isSortedDesc ? (
                                <img
                                  className="table-header-icon"
                                  src={sortDownIcon}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="table-header-icon"
                                  src={sortUpIcon}
                                  alt=""
                                />
                              )
                            ) : (
                              <img
                                className="table-header-icon"
                                src={sortIcon}
                                alt=""
                              />
                            )
                          ) : (
                            ""
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row: any, i: any) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell: any) => {
                          return (
                            <td
                              {...cell.getCellProps({
                                style: {
                                  width: cell.column.width,
                                  minWidth: cell.column.minWidth,
                                  maxWidth: cell.column.maxWidth,
                                },
                              })}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div>Data not available</div>
            <Link to="/">Dashboard</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default DataGrid;
