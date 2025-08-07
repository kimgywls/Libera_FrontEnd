export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GRADES = [1, 2, 3];
export const SEMESTERS = [1, 2];
export const PERIODS = [
    { grade: 1, semester: 1, label: '1학년 1학기' },
    { grade: 1, semester: 2, label: '1학년 2학기' },
    { grade: 2, semester: 1, label: '2학년 1학기' },
    { grade: 2, semester: 2, label: '2학년 2학기' },
    { grade: 3, semester: 1, label: '3학년 1학기' },
];

export const SEMESTER_TREND_CATEGORY_LABELS: Record<string, string> = {
    'overall': '전과목',
    'main_with_science': '국어+수학+영어+사회(한국사)+과학',
    'main_with_science_only': '국어+수학+영어+과학',
    'main_with_social': '국어+수학+영어+사회(한국사)',
    'math_science': '수학+과학',
    'math_english_science': '수학+영어+과학',
    'korean_english_social': '국어+영어+사회(한국사)',
    'science': '과학',
    'social': '사회(한국사)',
    'english': '영어',
    'math': '수학',
    'korean': '국어',
};

export const CATEGORY_OPTIONS = ['일반선택', '진로선택', '체육/예술'] as const;

export const CATEGORY_COLUMNS = {
    '일반선택': [
        { key: 'subject_type', label: `이수\n구분` },
        { key: 'curriculum', label: '교과' },
        { key: 'subject', label: '과목' },
        { key: 'credit_hours', label: `단위\n수` },
        { key: 'raw_score', label: '원점수' },
        { key: 'subject_average', label: `과목\n평균` },
        { key: 'standard_deviation', label: `표준\n편차` },
        { key: 'achievement_level', label: '성취도' },
        { key: 'student_count', label: `수강자\n수` },
        { key: 'grade_rank', label: '석차\n등급' },
    ],
    '진로선택': [
        { key: 'subject_type', label: `이수\n구분` },
        { key: 'curriculum', label: '교과' },
        { key: 'subject', label: '과목' },
        { key: 'credit_hours', label: `단위\n수` },
        { key: 'raw_score', label: '원점수' },
        { key: 'subject_average', label: `과목\n평균` },
        { key: 'achievement_level', label: '성취도' },
        { key: 'student_count', label: `수강자수` },
        { key: 'achievement_distribution', label: '성취도별 분포 비율' },
    ],
    '체육/예술': [
        { key: 'subject_type', label: `이수\n구분` },
        { key: 'curriculum', label: '교과' },
        { key: 'subject', label: '과목' },
        { key: 'credit_hours', label: `단위\n수` },
        { key: 'achievement_level', label: '성취도' },
    ],
} as const;

export const RESULT_REPORT_CATEGORY_COLUMNS = {
    '일반선택': [
        { key: 'curriculum', label: '교과' },
        { key: 'subject', label: '과목' },
        { key: 'credit_hours', label: `단위수` },
        { key: 'raw_score', label: '원점수' },
        { key: 'subject_average', label: `과목\n평균` },
        { key: 'standard_deviation', label: `표준\n편차` },
        { key: 'achievement_level', label: '성취도' },
        { key: 'student_count', label: `수강자수` },
        { key: 'grade_rank', label: '석차\n등급' },
    ],
    '진로선택': [
        { key: 'curriculum', label: '교과' },
        { key: 'subject', label: '과목' },
        { key: 'credit_hours', label: `단위수` },
        { key: 'raw_score', label: '원점수' },
        { key: 'subject_average', label: `과목\n평균` },
        { key: 'achievement_level', label: '성취도' },
        { key: 'student_count', label: `수강자수` },
        { key: 'achievement_distribution', label: '성취도별 분포 비율' },
    ],
    '체육/예술': [
        { key: 'curriculum', label: '교과' },
        { key: 'subject', label: '과목' },
        { key: 'credit_hours', label: `단위수` },
        { key: 'achievement_level', label: '성취도' },
    ],
} as const;

export const CHECKLIST_MAIN_CATEGORY_LABELS: Record<string, string> = {
    1: '학업역량',
    2: '진로역량',
    3: '공동체역량',
};

export const CHECKLIST_SUB_CATEGORY_LABELS: Record<string, string> = {
    1: '학업성취도',
    2: '기초학업역량',
    3: '심화학업역량',
    4: '학업태도',
    5: '진로탐색활동과 경험',
    6: '진로탐색역량',
    7: '지식탐구역량',
    8: '문제해결능력',
    9: '협업과 소통능력',
    10: '리더십',
    11: '성실성 및 책임감',
    12: '나눔과 배려',
    13: '의사소통능력',
};

export const ALL_COLUMNS = Array.from(
    new Set(Object.values(CATEGORY_COLUMNS).flat().map(col => col.key))
);

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];


export const CHECKLIST_SCORE_LABELS = [
    { label: '탁월(A)', value: 5 },
    { label: '우수(B)', value: 4 },
    { label: '보통(C)', value: 3 },
    { label: '미흡(D)', value: 2 },
    { label: '부족(E)', value: 1 },
];

export const CHECKLIST_OX_SCORE_LABELS = [
    { label: 'O', value: 5 },
    { label: 'X', value: 3 },
];

export const RECOMMEND_TYPE_LABEL: Record<string, string> = {
    '도전': '도전',
    '적정': '적정',
    '안정': '안정',
    '없음': '신설',
    '신설': '적정',
    '적합': '적합',
};

export const RECOMMEND_TYPE_COLOR: Record<string, string> = {
    '도전': 'bg-red-100 text-red-600',
    '적정': 'bg-blue-100 text-blue-600',
    '안정': 'bg-green-100 text-green-600',
    '없음': 'bg-yellow-100 text-yellow-600',
    '신설': 'bg-blue-100 text-blue-600',
    '적합': 'bg-blue-100 text-blue-600',
};

export const NON_SCORE_RECOMMEND_TYPE_COLOR: Record<string, string> = {
    '추천': 'bg-blue-100 text-blue-600',
    '비추천': 'bg-red-100 text-red-600',
    '없음': 'bg-gray-100 text-gray-600',
};