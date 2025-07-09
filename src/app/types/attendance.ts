export interface Attendance {
    grade: number;
    total_days: number;
    absence_disease: number;
    absence_unexcused: number;
    absence_etc: number;
    tardiness_disease: number;
    tardiness_unexcused: number;
    tardiness_etc: number;
    early_leave_disease: number;
    early_leave_unexcused: number;
    early_leave_etc: number;
    result_disease: number;
    result_unexcused: number;
    result_etc: number;
    special_notes: string | null;
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