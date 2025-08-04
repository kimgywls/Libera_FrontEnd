import type { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Column<T = any> {
    readonly key: keyof T & string;
    readonly label: string;
    readonly render?: (value: T[keyof T], row: T, index: number) => ReactNode;
}

interface BaseTableProps<T> {
    columns: readonly Column<T>[];
    data: T[];
    renderCell?: (value: T[keyof T], column: Column<T>, row: T, index: number) => ReactNode;
    className?: string;
}

const BaseTable = <T,>({
    columns,
    data,
    renderCell,
    className = ''
}: BaseTableProps<T>) => {
    const defaultRenderCell = (value: T[keyof T], column: Column<T>, row: T, index: number) => {
        if (column.render) {
            return column.render(value, row, index);
        }

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return Object.entries(value as Record<string, unknown>)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ');
        }

        return value !== undefined && value !== null && value !== '' ? value : '-';
    };

    return (
        <div className={`overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.key}
                                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-x border-gray-200 whitespace-pre-line"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            {columns.map(column => {
                                const value = row[column.key];
                                const cellContent = renderCell
                                    ? renderCell(value, column, row, index)
                                    : defaultRenderCell(value, column, row, index);

                                return (
                                    <td
                                        key={column.key}
                                        className="px-4 py-2 whitespace-pre-line text-gray-900 border-x border-gray-200"
                                    >
                                        {cellContent as ReactNode}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BaseTable; 