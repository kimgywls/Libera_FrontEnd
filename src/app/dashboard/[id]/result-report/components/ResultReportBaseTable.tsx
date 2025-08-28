import type { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Column<T = any> {
    readonly key: keyof T & string;
    readonly label: string;
    readonly render?: (value: T[keyof T], row: T, index: number) => ReactNode;
    readonly width?: string;
}

interface BaseTableProps<T> {
    columns: readonly Column<T>[];
    data: T[];
    renderCell?: (value: T[keyof T], column: Column<T>, row: T, index: number) => ReactNode;
    className?: string;
    headerClassName?: string;
}

const ResultReportBaseTable = <T,>({
    columns,
    data,
    renderCell,
    className = '',
    headerClassName = ''
}: BaseTableProps<T>) => {
    // 타입 가드 함수
    const isLongTextObject = (value: unknown): value is { value: string; isLongText?: boolean } => {
        return typeof value === 'object' && value !== null && 'value' in value && 'isLongText' in value;
    };

    const defaultRenderCell = (value: T[keyof T], column: Column<T>, row: T, index: number) => {
        if (column.render) {
            return column.render(value, row, index);
        }

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // 특별한 객체 형태 처리 (value와 isLongText 속성을 가진 객체)
            if (isLongTextObject(value)) {
                const cellData = value;
                const className = cellData.isLongText ? 'result-report-text-small' : 'result-report-text-normal';
                return (
                    <span className={className}>
                        {cellData.value !== undefined && cellData.value !== null && cellData.value !== '' ? cellData.value : '-'}
                    </span>
                );
            }

            return Object.entries(value as Record<string, unknown>)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ');
        }

        return value !== undefined && value !== null && value !== '' ? value : '-';
    };

    return (
        <div className={`result-report-table-container ${className}`}>
            <table className="result-report-table table-fixed">
                <thead className="result-report-table-head">
                    <tr className="result-report-table-row">
                        {columns.map(column => (
                            <th
                                key={column.key}
                                className={`result-report-table-header-cell ${headerClassName} ${column.width || ''}`}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="result-report-table-body">
                    {data.map((row, index) => (
                        <tr key={index} className="result-report-table-data-row">
                            {columns.map(column => {
                                const value = row[column.key];
                                const cellContent = renderCell
                                    ? renderCell(value, column, row, index)
                                    : defaultRenderCell(value, column, row, index);

                                // isLongText가 true인지 확인
                                const isLongTextCell = isLongTextObject(value) && value.isLongText;
                                const cellClassName = isLongTextCell
                                    ? 'result-report-table-cell result-report-table-cell-long-text'
                                    : 'result-report-table-cell result-report-table-cell-normal';

                                return (
                                    <td
                                        key={column.key}
                                        className={`${cellClassName} ${column.width || ''}`}
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

export default ResultReportBaseTable; 