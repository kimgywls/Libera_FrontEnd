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
                const className = cellData.isLongText ? 'text-xs leading-tight' : '';
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
        <div className={`overflow-x-auto rounded-lg border border-gray-200 bg-white ${className}`} style={{ borderColor: '#e5e7eb', backgroundColor: '#ffffff' }}>
            <table className="min-w-full" style={{ borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f5f3ff' }}>
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.key}
                                className={`px-3 py-1.5 text-left font-semibold whitespace-pre-line ${headerClassName}`}
                                style={{
                                    color: '#374151',
                                    borderColor: '#d1d5db',
                                    borderLeftWidth: '1px',
                                    borderRightWidth: '1px'
                                }}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} style={{
                            backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                            borderBottom: '1px solid #f3f4f6'
                        }}>
                            {columns.map(column => {
                                const value = row[column.key];
                                const cellContent = renderCell
                                    ? renderCell(value, column, row, index)
                                    : defaultRenderCell(value, column, row, index);

                                // isLongText가 true인지 확인
                                const isLongTextCell = isLongTextObject(value) && value.isLongText;
                                const cellPaddingClass = isLongTextCell ? 'px-2 py-1.5' : 'px-4 py-1.5';

                                return (
                                    <td
                                        key={column.key}
                                        className={`${cellPaddingClass} whitespace-pre-line`}
                                        style={{
                                            color: '#111827',
                                            borderColor: '#d1d5db',
                                            borderLeftWidth: '1px',
                                            borderRightWidth: '1px',
                                            wordBreak: 'break-all',
                                            overflowWrap: 'break-word'
                                        }}
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