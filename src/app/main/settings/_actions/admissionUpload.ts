import axios from 'axios';

export async function uploadAdmissionData(target_year: number, file: File) {
    const formData = new FormData();
    formData.append('target_year', String(target_year));
    formData.append('file', file);

    const response = await axios.post('/api/v1/admissions/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
} 