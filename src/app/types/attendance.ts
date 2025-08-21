import { BaseEntity, StudentBase, GradeSemester, AttendanceBase } from './common';

export interface Attendance extends BaseEntity, StudentBase, GradeSemester, AttendanceBase {
    [key: string]: string | number | null | undefined;
}

export interface AttendanceSummary {
    total_absence: number;
    total_tardiness: number;
    total_early_leave: number;
}

export interface AttendanceApiResponse {
    total_records: number;
    records: Attendance[];
    summary: AttendanceSummary;
    has_data: boolean;
} 