import React from "react";
import {useHistory} from "react-router-dom";

import { useTable, useSortBy, usePagination } from 'react-table';

function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination,
  )
  const history = useHistory();
  const handleClick = id => history.push(`/catalog/item-${id}`);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <span>{column.render('Header')}</span>
                {/* Add a sort direction indicator */}
                <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <svg  className="icon active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M27.2 49.1h-6.4v-46c0-.3-.1-.6-.3-.8-.2-.2-.4-.3-.8-.3h-6.4c-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8v46.1H5.8c-.5 0-.8.2-1 .7-.2.3-.1.7.2 1.1l10.7 10.7c.2.2.5.3.8.3.3 0 .5-.1.8-.3L28 51c.2-.3.3-.5.3-.8 0-.3-.1-.6-.3-.8-.2-.2-.4-.3-.8-.3zm25.1 9.1H44l-1 .1-.5.1v-.1l.4-.4.7-.9L56 39.3v-3H37V44h4v-3.9h7.8l1-.1h.5v.1l-.4.3-.7.9L36.7 59v3h19.6v-7.8h-4.1l.1 4zm4.6-34L49.2 2h-5.4l-7.7 22.2h-2.3v3.5h9.6v-3.5h-2.5l1.6-4.8h8.1l1.6 4.8h-2.5v3.5h9.6v-3.5h-2.4zm-13.4-8.5L46 8.4l.3-1 .1-.6.1-.7h.1l.1.7.4 1.6 2.4 7.3h-6z"/></svg>
                        : <svg className="icon active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M27.2 49.1h-6.4v-46c0-.3-.1-.6-.3-.8-.2-.2-.4-.3-.8-.3h-6.4c-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8v46.1H5.8c-.5 0-.8.2-1 .7-.2.3-.1.7.2 1.1l10.7 10.7c.2.2.5.3.8.3.3 0 .5-.1.8-.3L28 51c.2-.3.3-.5.3-.8 0-.3-.1-.6-.3-.8-.2-.2-.4-.3-.8-.3zm29.7 9.4l-7.7-22.2h-5.4l-7.7 22.2h-2.3V62h9.6v-3.5h-2.5l1.6-4.8h8.1l1.6 4.8h-2.5V62h9.6v-3.5h-2.4zm-13.4-8.6l2.4-7.3.3-1 .1-.6.1-.7h.1l.1.7.4 1.6 2.4 7.3h-5.9zm12.8-30h-4.1v4h-9.3l-.4.1v-.1l.4-.3.7-.9L55.9 5V2h-19v7.7h4V5.8h7.8l1-.1h.5v.1l-.4.3-.7.9-12.3 17.7v3h19.6v-7.8z"/></svg>
                      : <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M22 2L8.7 15.3h10v23.4h6.7V15.3h10L22 2zm23.3 46.7V25.3h-6.7v23.4h-10L42 62l13.3-13.3h-10z"/></svg>
                    }
                  </span>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row)
          return (
            <tr onClick={() => {
              handleClick(row.original.id)
            }} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <span className="counter">
          Page{' '}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
        </span>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </div>
    </>
  )
}


export default DataTable