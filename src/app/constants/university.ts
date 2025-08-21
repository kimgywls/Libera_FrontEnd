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
