import React from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getKey?: (item: T) => string;
  emptyMessage?: string;
}

export function DataTable<T>({ columns, data, getKey, emptyMessage }: DataTableProps<T>) {
  if (!data.length) {
    return <p>{emptyMessage ?? 'No records available.'}</p>;
  }

  return (
    <table className="table-grid">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key as string}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={getKey ? getKey(item) : index}>
            {columns.map((column) => (
              <td key={column.key as string}>{column.render ? column.render(item) : (item as any)[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
