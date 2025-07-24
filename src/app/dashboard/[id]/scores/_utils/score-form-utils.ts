import type { ScoreForm, AchievementDistribution } from '@/app/types/score';

/**
 * 문자열을 숫자로 안전하게 변환합니다
 * 한글이나 잘못된 입력이 있을 경우 null을 반환합니다
 */
export function safeParseNumber(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined || value === '') return null;

    const stringValue = String(value);
    // 한글이나 영문이 포함된 경우 null 반환
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z]/.test(stringValue)) {
        return null;
    }

    const parsedValue = Number(stringValue);
    return isNaN(parsedValue) ? null : parsedValue;
}

/**
 * achievement_distribution 문자열을 객체로 변환합니다
 * 예: "A: 20, B: 30, C: 50" → { A: 20, B: 30, C: 50 }
 */
export function parseAchievementDistribution(value: string | AchievementDistribution | null | undefined): AchievementDistribution | string | null {
    if (!value || typeof value !== 'string') return value as AchievementDistribution | null;

    const trimmedValue = value.trim();
    if (trimmedValue === '') return null;

    try {
        const distributionObj: AchievementDistribution = {};
        trimmedValue.split(',').forEach(part => {
            const [key, val] = part.split(':').map(s => s.trim());
            if (key && val) {
                const parsedVal = safeParseNumber(val);
                if (parsedVal !== null) {
                    distributionObj[key] = parsedVal;
                }
            }
        });

        // 객체가 비어있지 않으면 객체 반환, 비어있으면 원본 문자열 반환
        return Object.keys(distributionObj).length > 0 ? distributionObj : value;
    } catch (error) {
        console.error(error);
        return value; // 파싱 실패 시 원본 문자열 반환
    }
}

/**
 * ScoreForm의 필드 변경을 처리하는 공통 함수
 */
export function handleScoreFormFieldChange(
    scoreForm: ScoreForm,
    field: keyof ScoreForm,
    value: ScoreForm[keyof ScoreForm]
): ScoreForm {
    // 숫자 필드 처리
    if (field === 'raw_score' || field === 'subject_average' || field === 'credit_hours' || field === 'standard_deviation') {
        return {
            ...scoreForm,
            [field]: safeParseNumber(value as string | number)
        };
    }

    // student_count와 grade_rank는 string | null 타입
    if (field === 'student_count' || field === 'grade_rank') {
        return {
            ...scoreForm,
            [field]: value as string | null
        };
    }

    // achievement_distribution 필드 처리
    if (field === 'achievement_distribution') {
        return {
            ...scoreForm,
            [field]: parseAchievementDistribution(value as string | AchievementDistribution) as AchievementDistribution | null
        };
    }

    // grade, semester 필드 처리 (number 타입)
    if (field === 'grade' || field === 'semester') {
        return {
            ...scoreForm,
            [field]: typeof value === 'string' ? Number(value) : value as number
        };
    }

    // 문자열 필드 처리 (subject_type, curriculum, subject, achievement_level, notes)
    if (field === 'subject_type' || field === 'curriculum' || field === 'subject' ||
        field === 'achievement_level' || field === 'notes') {
        return {
            ...scoreForm,
            [field]: value as string | null
        };
    }

    // id 필드 처리
    if (field === 'id') {
        return {
            ...scoreForm,
            [field]: value as number | undefined
        };
    }

    // 기타 필드는 그대로 처리 (타입 안전성을 위해 명시적 처리)
    return scoreForm;
}

/**
 * CreateScoreRequest용 achievement_distribution 변환
 */
export function convertAchievementDistributionForCreate(
    distribution: AchievementDistribution | string | null | undefined
): AchievementDistribution {
    if (!distribution) return { A: 0, B: 0, C: 0 };

    if (typeof distribution === 'string') {
        const parsed = parseAchievementDistribution(distribution);
        return typeof parsed === 'object' && parsed !== null ? parsed : { A: 0, B: 0, C: 0 };
    }

    return distribution;
} 