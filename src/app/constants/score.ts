export const GRADES = [1, 2, 3];
export const SEMESTERS = [1, 2];
export const PERIODS = [
    { grade: 1, semester: 1, label: '1학년 1학기' },
    { grade: 1, semester: 2, label: '1학년 2학기' },
    { grade: 2, semester: 1, label: '2학년 1학기' },
    { grade: 2, semester: 2, label: '2학년 2학기' },
    { grade: 3, semester: 1, label: '3학년 1학기' },
];

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
        { key: 'subject_average', label: `과목평균` },
        { key: 'standard_deviation', label: `표준편차` },
        { key: 'achievement_level', label: '성취도' },
        { key: 'student_count', label: `수강자수` },
        { key: 'grade_rank', label: '석차등급' },
    ],
    '진로선택': [
        { key: 'curriculum', label: '교과' },
        { key: 'subject', label: '과목' },
        { key: 'credit_hours', label: `단위수` },
        { key: 'raw_score', label: '원점수' },
        { key: 'subject_average', label: `과목평균` },
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

export const ALL_COLUMNS = Array.from(
    new Set(Object.values(CATEGORY_COLUMNS).flat().map(col => col.key))
);

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

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
