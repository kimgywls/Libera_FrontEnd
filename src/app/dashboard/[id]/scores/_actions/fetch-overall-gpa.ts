import axios from 'axios';

export interface OverallGpaResponse {
    student_id: number;
    gpa: number;
    main_subjects_gpa: number;
    total_scores: number;
    valid_scores: number;
    main_subjects_scores: number;
    main_subjects_valid_scores: number;
    message?: string;
}

export async function fetchOverallGpa(studentId: number): Promise<OverallGpaResponse> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/scores/students/${studentId}/gpa/overall`;
    const { data } = await axios.get(apiUrl);
    //console.log(data.data);
    return data.data;
} 