import axios from 'axios';
import { ScoreForm } from '@/app/types/score';

export async function putBulkScores(studentId: number, scores: ScoreForm[]) {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/scores/students/${studentId}/scores/bulk`;
    await axios.put(apiUrl, scores);
} 