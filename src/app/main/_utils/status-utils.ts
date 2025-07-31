import { Student } from '@/app/types/student';

// completion_status에 따른 표시 텍스트 매핑
export const completionStatusMap: Record<Student['completion_status'], string> = {
    '완료': '2학년 성적 완료',
    '성적만 완료': '성적만 완료',
    '출결만 완료': '출결만 완료',
    '미완료': '미완료',
};

// completion_status에 따른 스타일 매핑
export const getStatusStyle = (status: Student['completion_status']) => {
    switch (status) {
        case '완료':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200 w-fit text-center';
        case '미완료':
            return 'bg-red-100 text-red-800 border-red-200 w-fit text-center';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200 w-fit text-center';
    }
};

// 3학년 성적 상태에 따른 스타일 매핑
export const getThirdGradeStatusStyle = (hasScores: boolean) => {
    if (hasScores) {
        return 'bg-blue-100 text-blue-800 border-blue-200 w-fit text-center';
    } else {
        return 'bg-gray-100 text-gray-800 border-gray-200 w-fit text-center';
    }
};

// 3학년 성적 상태에 따른 텍스트 매핑
export const getThirdGradeStatusText = (hasScores: boolean, isLoading: boolean) => {
    if (isLoading) {
        return '확인 중...';
    }
    
    if (hasScores) {
        return '3학년 성적 완료';
    } else {
        return '3학년 성적 미완료';
    }
}; 