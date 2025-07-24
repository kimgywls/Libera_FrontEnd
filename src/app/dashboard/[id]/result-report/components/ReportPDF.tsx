import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
} from '@react-pdf/renderer';
import { StudentReportData } from '@/app/types/report';
import { SEMESTER_TREND_CATEGORY_LABELS } from '@/app/constants';

// 한글 폰트 등록
Font.register({
    family: 'NanumGothic',
    src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf',
});

Font.register({
    family: 'NanumGothic-Bold',
    src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Bold.ttf',
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 0,
        fontFamily: 'NanumGothic',
    },

    // 헤더 스타일
    header: {
        backgroundColor: '#7c3aed',
        padding: 30,
        marginBottom: 0,
    },
    headerContent: {
        textAlign: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#ffffff',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 14,
        color: '#e0e7ff',
        marginBottom: 5,
    },
    reportDate: {
        fontSize: 11,
        color: '#c7d2fe',
        marginTop: 10,
    },

    // 학생 정보 카드
    studentInfoContainer: {
        margin: 20,
        marginBottom: 25,
    },
    studentInfoCard: {
        padding: 20,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
    },
    studentInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1e293b',
        borderBottom: '2px solid #7c3aed',
        paddingBottom: 5,
    },
    studentInfoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    infoItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoItemFull: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#64748b',
        width: 70,
        marginRight: 10,
    },
    infoValue: {
        fontSize: 11,
        color: '#1e293b',
        backgroundColor: '#ffffff',
        padding: '6 10',
        borderRadius: 4,
        border: '1px solid #e2e8f0',
        flex: 1,
    },

    // 섹션 스타일
    section: {
        margin: '0 20 25 20',
    },
    sectionHeader: {
        backgroundColor: '#f1f5f9',
        padding: 12,
        marginBottom: 15,
        borderRadius: 6,
        borderLeft: '4px solid #7c3aed',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
    },

    // 테이블 스타일
    tableContainer: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
    },
    table: {
        width: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#7c3aed',
        padding: 0,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #f1f5f9',
    },
    tableRowAlternate: {
        flexDirection: 'row',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #f1f5f9',
    },
    tableColHeader: {
        width: '25%',
        padding: 10,
    },
    tableCol: {
        width: '25%',
        padding: 10,
        justifyContent: 'center',
    },
    tableCellHeader: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    tableCell: {
        fontSize: 10,
        color: '#374151',
        textAlign: 'center',
    },
    tableCellBold: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#1e293b',
        textAlign: 'center',
    },

    // 차트 컨테이너
    chartContainer: {
        marginBottom: 25,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        padding: 15,
    },
    chartTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#1e293b',
        textAlign: 'center',
        backgroundColor: '#f1f5f9',
        padding: 8,
        borderRadius: 4,
    },
    chartPlaceholder: {
        backgroundColor: '#f8fafc',
        padding: 20,
        textAlign: 'center',
        borderRadius: 6,
        border: '2px dashed #cbd5e1',
    },
    chartPlaceholderText: {
        fontSize: 11,
        color: '#64748b',
        fontStyle: 'italic',
    },

    // 체크리스트 스타일
    categoryCard: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
    },
    categoryHeader: {
        backgroundColor: '#7c3aed',
        padding: 12,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    categoryContent: {
        padding: 15,
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f8fafc',
        borderRadius: 6,
        border: '1px solid #f1f5f9',
    },
    questionText: {
        fontSize: 10,
        flex: 1,
        color: '#374151',
        marginRight: 10,
    },
    scoreContainer: {
        backgroundColor: '#7c3aed',
        borderRadius: 4,
        padding: '4 8',
        minWidth: 40,
    },
    scoreText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    scoreTextEmpty: {
        fontSize: 10,
        color: '#9ca3af',
        textAlign: 'center',
        backgroundColor: '#f3f4f6',
        padding: '4 8',
        borderRadius: 4,
        minWidth: 40,
    },

    // 요약 박스
    summaryContainer: {
        margin: '20 20 0 20',
    },
    summaryBox: {
        backgroundColor: '#e0f2fe',
        padding: 20,
        borderRadius: 8,
        border: '1px solid #0284c7',
        borderLeft: '4px solid #0284c7',
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#0c4a6e',
        textAlign: 'center',
    },
    summaryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryItem: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 6,
        width: '30%',
        border: '1px solid #bae6fd',
    },
    summaryItemLabel: {
        fontSize: 9,
        color: '#0369a1',
        marginBottom: 4,
        textAlign: 'center',
    },
    summaryItemValue: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0c4a6e',
        textAlign: 'center',
    },

    // 푸터
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        paddingTop: 10,
    },
    footerText: {
        fontSize: 9,
        color: '#94a3b8',
    },

    // 페이지 번호
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#64748b',
    },

    // 성적 등급별 색상
    gradeA: { color: '#059669', fontWeight: 'bold' },
    gradeB: { color: '#0284c7', fontWeight: 'bold' },
    gradeC: { color: '#d97706', fontWeight: 'bold' },
    gradeD: { color: '#dc2626', fontWeight: 'bold' },
});

interface ReportPDFProps {
    data: StudentReportData;
    chartImages?: {
        checklistChart?: string;
        semesterTrendCharts?: string[];
    };
}

const ReportPDF: React.FC<ReportPDFProps> = ({ data, chartImages }) => {
    const { studentInfo, scores, semesterTrend, checklistQuestions, checklistResponses, overallGpa } = data;

    // 성적 데이터를 학기별로 그룹화
    const scoresBySemester = scores.reduce((acc, score) => {
        const key = `${score.grade}-${score.semester}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(score);
        return acc;
    }, {} as Record<string, typeof scores>);

    // 체크리스트 응답을 질문 ID로 매핑
    const responsesMap = checklistResponses.reduce((acc, response) => {
        acc[response.checklist_question_id] = response.score;
        return acc;
    }, {} as Record<number, number>);

    // 체크리스트 질문을 카테고리별로 그룹화
    const questionsByCategory = checklistQuestions.reduce((acc, question) => {
        const categoryId = question.main_category_id;
        if (!acc[categoryId]) acc[categoryId] = [];
        acc[categoryId].push(question);
        return acc;
    }, {} as Record<number, typeof checklistQuestions>);

    const categoryNames = {
        1: '학업역량',
        2: '진로역량',
        3: '공동체역량'
    };

    // 성적에 따른 스타일 선택
    const getGradeStyle = (grade: number) => {
        if (grade <= 2) return styles.gradeA;
        if (grade <= 4) return styles.gradeB;
        if (grade <= 6) return styles.gradeC;
        return styles.gradeD;
    };



    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* 헤더 */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.title}>학생 종합 결과보고서</Text>
                    </View>
                </View>

                {/* 학생 정보 */}
                <View style={styles.studentInfoContainer}>
                    <View style={styles.studentInfoCard}>
                        <Text style={styles.studentInfoTitle}>학생 기본 정보</Text>
                        <View style={styles.studentInfoGrid}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>학생명</Text>
                                <Text style={styles.infoValue}>{studentInfo.name}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>재학교</Text>
                                <Text style={styles.infoValue}>{studentInfo.current_school_name}</Text>
                            </View>
                            <View style={styles.infoItemFull}>
                                <Text style={styles.infoLabel}>희망대학</Text>
                                <Text style={styles.infoValue}>
                                    {studentInfo.desired_school?.map(school => school.school_name).join(', ') || '미정'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 내신 성적 섹션 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>내신 성적 현황</Text>
                    </View>

                    {Object.entries(scoresBySemester)
                        .sort(([a], [b]) => {
                            const [gradeA, semesterA] = a.split('-');
                            const [gradeB, semesterB] = b.split('-');
                            // 학년 먼저 비교, 같으면 학기 비교
                            if (gradeA !== gradeB) {
                                return Number(gradeA) - Number(gradeB);
                            }
                            return Number(semesterA) - Number(semesterB);
                        })
                        .map(([semesterKey, semesterScores]) => {
                            const [grade, semester] = semesterKey.split('-');
                            return (
                                <View key={semesterKey} style={styles.chartContainer}>
                                    <Text style={styles.chartTitle}>
                                        {grade}학년 {semester}학기 성적표
                                    </Text>
                                    <View style={styles.tableContainer}>
                                        <View style={styles.table}>
                                            <View style={styles.tableHeader}>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>과목명</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>원점수</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>석차등급</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>과목구분</Text>
                                                </View>
                                            </View>
                                            {semesterScores.map((score, index) => (
                                                <View
                                                    key={index}
                                                    style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}
                                                >
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellBold}>{score.subject}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.raw_score}점</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={[styles.tableCellBold, getGradeStyle(Number(score.grade_rank))]}>
                                                            {score.grade_rank}등급
                                                        </Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.subject_type}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                </View>

                {/* 석차등급 추이 섹션 */}
                {semesterTrend && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>석차등급 추이 분석</Text>
                        </View>

                        {/* 차트 영역 */}
                        <View style={styles.chartContainer}>
                            <Text style={styles.chartTitle}>석차등급 추이 차트</Text>
                            {chartImages?.semesterTrendCharts && chartImages.semesterTrendCharts.length > 0 ? (
                                <View>
                                    {Array.from({ length: Math.ceil((chartImages.semesterTrendCharts || []).length / 2) }, (_, rowIndex) => (
                                        <View key={rowIndex} style={{ flexDirection: 'row', marginBottom: 15 }}>
                                            {(chartImages.semesterTrendCharts || [])
                                                .slice(rowIndex * 2, (rowIndex + 1) * 2)
                                                .map((chartImage, colIndex) => (
                                                    <View key={colIndex} style={{
                                                        width: '48%',
                                                        marginRight: colIndex < 1 ? '4%' : 0
                                                    }}>
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <Image
                                                            src={chartImage}
                                                            style={{
                                                                width: '100%',
                                                                height: 200,
                                                                objectFit: 'contain',
                                                                borderRadius: 6,
                                                            }}
                                                        />
                                                    </View>
                                                ))}
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <View style={styles.chartPlaceholder}>
                                    <Text style={styles.chartPlaceholderText}>
                                        석차등급 추이 차트를 생성하려면 교과 페이지를 먼저 방문해주세요
                                    </Text>
                                </View>
                            )}
                        </View>

                        {semesterTrend.categories?.map((category) => (
                            <View key={category.id} style={styles.chartContainer}>
                                <Text style={styles.chartTitle}>
                                    {SEMESTER_TREND_CATEGORY_LABELS[category.id] || category.name}
                                </Text>
                                <View style={styles.tableContainer}>
                                    <View style={styles.table}>
                                        <View style={styles.tableHeader}>
                                            <View style={[styles.tableColHeader, { width: '50%' }]}>
                                                <Text style={styles.tableCellHeader}>학기</Text>
                                            </View>
                                            <View style={[styles.tableColHeader, { width: '50%' }]}>
                                                <Text style={styles.tableCellHeader}>석차등급</Text>
                                            </View>
                                        </View>
                                        {category.periods.map((period, index) => (
                                            <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}>
                                                <View style={[styles.tableCol, { width: '50%' }]}>
                                                    <Text style={styles.tableCell}>
                                                        {period.grade}학년 {period.semester}학기
                                                    </Text>
                                                </View>
                                                <View style={[styles.tableCol, { width: '50%' }]}>
                                                    <Text style={[styles.tableCellBold, getGradeStyle(period.gpa)]}>
                                                        {period.gpa}등급
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* 체크리스트 결과 섹션 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>역량 평가 결과</Text>
                    </View>

                    {/* 체크리스트 차트 */}
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>평가요소별 점수 차트</Text>
                        {chartImages?.checklistChart ? (
                            <>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <Image
                                    src={chartImages.checklistChart}
                                    style={{
                                        width: '100%',
                                        height: 300,
                                        marginBottom: 10,
                                        objectFit: 'contain',
                                        borderRadius: 6,
                                    }}
                                />
                            </>
                        ) : (
                            <View style={styles.chartPlaceholder}>
                                <Text style={styles.chartPlaceholderText}>
                                    역량 평가 차트를 생성하려면 체크리스트 페이지를 먼저 방문해주세요
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* 카테고리별 체크리스트 */}
                    {Object.entries(questionsByCategory).map(([categoryId, questions]) => (
                        <View key={categoryId} style={styles.categoryCard}>
                            <View style={styles.categoryHeader}>
                                <Text style={styles.categoryTitle}>
                                    {categoryNames[Number(categoryId) as keyof typeof categoryNames]}
                                </Text>
                            </View>
                            <View style={styles.categoryContent}>
                                {questions.map((question) => {
                                    const score = responsesMap[question.checklist_question_id];
                                    return (
                                        <View key={question.checklist_question_id} style={styles.checklistItem}>
                                            <Text style={styles.questionText}>{question.question_text}</Text>
                                            {score !== undefined ? (
                                                <View style={styles.scoreContainer}>
                                                    <Text style={styles.scoreText}>{score}점</Text>
                                                </View>
                                            ) : (
                                                <View style={styles.scoreTextEmpty}>
                                                    <Text style={styles.scoreTextEmpty}>-</Text>
                                                </View>
                                            )}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    ))}
                </View>

                {/* 종합 평가 요약 */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryTitle}>종합 평가 요약</Text>
                        <View style={styles.summaryGrid}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryItemLabel}>전체교과 내신</Text>
                                <Text style={[styles.summaryItemValue, getGradeStyle(overallGpa || 0)]}>
                                    {overallGpa}등급
                                </Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryItemLabel}>역량 평가 항목</Text>
                                <Text style={styles.summaryItemValue}>
                                    {checklistResponses.length}개
                                </Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryItemLabel}>평가 완료율</Text>
                                <Text style={styles.summaryItemValue}>
                                    {Math.round((checklistResponses.length / checklistQuestions.length) * 100)}%
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 푸터 */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Libera 입시 데이터 분석 연구소 | 본 보고서는 개인 맞춤형 입시 전략 수립을 위한 참고 자료입니다.
                    </Text>
                </View>

                {/* 페이지 번호 */}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
};

export default ReportPDF; 