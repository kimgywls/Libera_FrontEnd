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
import { Attendance } from '@/app/types/attendance';

// 한글 폰트 등록 - 기본 폰트 사용
Font.register({
    family: 'NanumGothic',
    src: 'https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf',
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
        padding: 24,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    studentInfoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1e293b',
        borderBottom: '3px solid #7c3aed',
        paddingBottom: 8,
    },
    studentInfoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    infoItem: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoItemFull: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#374151',
        width: 80,
        marginRight: 12,
    },
    infoValue: {
        fontSize: 12,
        color: '#1e293b',
        backgroundColor: '#ffffff',
        padding: '8 12',
        borderRadius: 6,
        border: '1px solid #d1d5db',
        flex: 1,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
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
        width: '10%',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableCol: {
        width: '10%',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableCellHeader: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.2,
    },
    tableCell: {
        fontSize: 8,
        color: '#374151',
        textAlign: 'center',
    },
    tableCellBold: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#1e293b',
        textAlign: 'center',
    },

    // 출결 테이블 전용 스타일
    attendanceTableColHeader: {
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    attendanceTableCol: {
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    attendanceTableCellHeader: {
        fontSize: 7,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: 1.1,
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
                        </View>
                        <View style={styles.studentInfoGrid}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>희망대학</Text>
                                <Text style={styles.infoValue}>
                                    {(() => {
                                        const schoolNames = studentInfo.desired_school?.map(school => school.school_name).join(', ') || '미정';
                                        return schoolNames === 'none' ? '-' : schoolNames;
                                    })()}
                                </Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>희망학과</Text>
                                <Text style={styles.infoValue}>
                                    {(() => {
                                        const departmentNames = studentInfo.desired_school?.map(school => school.department_name).join(', ') || '미정';
                                        return departmentNames === 'none' ? '-' : departmentNames;
                                    })()}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>학생 출결 현황</Text>
                    </View>

                    {data.attendance && data.attendance.length > 0 ? (
                        <View style={styles.tableContainer}>
                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <View style={[styles.attendanceTableColHeader, { width: '10%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>학년</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '10%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>총{'\n'}등교일수</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>결석{'\n'}(질병)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>결석{'\n'}(무단)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>결석{'\n'}(기타)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>지각{'\n'}(질병)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>지각{'\n'}(무단)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>지각{'\n'}(기타)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>조퇴{'\n'}(질병)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>조퇴{'\n'}(무단)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>조퇴{'\n'}(기타)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>결과{'\n'}(질병)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>결과{'\n'}(무단)</Text>
                                    </View>
                                    <View style={[styles.attendanceTableColHeader, { width: '8%' }]}>
                                        <Text style={styles.attendanceTableCellHeader}>결과{'\n'}(기타)</Text>
                                    </View>
                                </View>

                                {data.attendance.map((attendance: Attendance, index: number) => (
                                    <View
                                        key={index}
                                        style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}
                                    >
                                        <View style={[styles.attendanceTableCol, { width: '10%' }]}>
                                            <Text style={styles.tableCellBold}>{attendance.grade}학년</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '10%' }]}>
                                            <Text style={styles.tableCell}>{attendance.total_days}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.absence_disease}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.absence_unexcused}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.absence_etc}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.tardiness_disease}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.tardiness_unexcused}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.tardiness_etc}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.early_leave_disease}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.early_leave_unexcused}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.early_leave_etc}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.result_disease}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.result_unexcused}</Text>
                                        </View>
                                        <View style={[styles.attendanceTableCol, { width: '8%' }]}>
                                            <Text style={styles.tableCell}>{attendance.result_etc}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ) : (
                        <View style={styles.chartPlaceholder}>
                            <Text style={styles.chartPlaceholderText}>
                                출결 데이터가 없습니다
                            </Text>
                        </View>
                    )}
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
                                                    <Text style={styles.tableCellHeader}>과목구분</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>과목명</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>단위수</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>원점수</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>과목평균</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>표준편차</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>성취도</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>수강자수</Text>
                                                </View>
                                                <View style={styles.tableColHeader}>
                                                    <Text style={styles.tableCellHeader}>석차등급</Text>
                                                </View>
                                            </View>

                                            {semesterScores.map((score, index) => (
                                                <View
                                                    key={index}
                                                    style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}
                                                >
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.subject_type}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCellBold}>{score.subject}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.credit_hours || '-'}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.raw_score || '-'}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.subject_average || '-'}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.standard_deviation || '-'}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.achievement_level || '-'}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{score.student_count || '-'}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={[styles.tableCellBold, getGradeStyle(Number(score.grade_rank))]}>
                                                            {score.grade_rank || '-'}
                                                        </Text>
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
                                    {Array.from({ length: Math.ceil((chartImages.semesterTrendCharts || []).length / 3) }, (_, rowIndex) => (
                                        <View key={rowIndex} style={{ flexDirection: 'row', marginBottom: 15 }}>
                                            {(chartImages.semesterTrendCharts || [])
                                                .slice(rowIndex * 3, (rowIndex + 1) * 3)
                                                .map((chartImage, colIndex) => (
                                                    <View key={colIndex} style={{
                                                        width: '30%',
                                                        marginRight: colIndex < 2 ? '5%' : 0
                                                    }}>
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <Image
                                                            src={chartImage}
                                                            style={{
                                                                width: '100%',
                                                                height: 180,
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

                    {/* 카테고리별 체크리스트 테이블 */}
                    {Object.entries(questionsByCategory).map(([categoryId, questions]) => (
                        <View key={categoryId} style={styles.chartContainer}>
                            <Text style={styles.chartTitle}>
                                {categoryNames[Number(categoryId) as keyof typeof categoryNames]}
                            </Text>
                            <View style={styles.tableContainer}>
                                <View style={styles.table}>
                                    <View style={styles.tableHeader}>
                                        <View style={[styles.tableColHeader, { width: '15%' }]}>
                                            <Text style={styles.tableCellHeader}>세부항목</Text>
                                        </View>
                                        <View style={[styles.tableColHeader, { width: '45%' }]}>
                                            <Text style={styles.tableCellHeader}>평가질문</Text>
                                        </View>
                                        <View style={[styles.tableColHeader, { width: '8%' }]}>
                                            <Text style={styles.tableCellHeader}>부족</Text>
                                        </View>
                                        <View style={[styles.tableColHeader, { width: '8%' }]}>
                                            <Text style={styles.tableCellHeader}>미흡</Text>
                                        </View>
                                        <View style={[styles.tableColHeader, { width: '8%' }]}>
                                            <Text style={styles.tableCellHeader}>보통</Text>
                                        </View>
                                        <View style={[styles.tableColHeader, { width: '8%' }]}>
                                            <Text style={styles.tableCellHeader}>우수</Text>
                                        </View>
                                        <View style={[styles.tableColHeader, { width: '8%' }]}>
                                            <Text style={styles.tableCellHeader}>탁월</Text>
                                        </View>
                                    </View>

                                    {questions.map((question, index) => {
                                        const score = responsesMap[question.checklist_question_id];

                                        return (
                                            <View
                                                key={question.checklist_question_id}
                                                style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlternate}
                                            >
                                                <View style={[styles.tableCol, { width: '15%' }]}>
                                                    <Text style={styles.tableCell}>
                                                        {question.sub_category_id === 1 ? '학업성취도' :
                                                            question.sub_category_id === 2 ? '기초학업역량' :
                                                                question.sub_category_id === 3 ? '심화학업역량' :
                                                                    question.sub_category_id === 4 ? '학업태도' :
                                                                        question.sub_category_id === 5 ? '진로탐색활동과 경험' :
                                                                            question.sub_category_id === 6 ? '진로탐색역량' :
                                                                                question.sub_category_id === 7 ? '지식탐구역량' :
                                                                                    question.sub_category_id === 8 ? '문제해결능력' :
                                                                                        question.sub_category_id === 9 ? '협업과 소통능력' :
                                                                                            question.sub_category_id === 10 ? '리더십' :
                                                                                                question.sub_category_id === 11 ? '성실성 및 책임감' :
                                                                                                    question.sub_category_id === 12 ? '나눔과 배려' :
                                                                                                        question.sub_category_id === 13 ? '의사소통능력' : '기본'}
                                                    </Text>
                                                </View>
                                                <View style={[styles.tableCol, { width: '45%' }]}>
                                                    <Text style={styles.tableCell}>
                                                        {question.question_text}
                                                    </Text>
                                                </View>
                                                {[1, 2, 3, 4, 5].map((scoreValue) => (
                                                    <View key={scoreValue} style={[styles.tableCol, { width: '8%' }]}>
                                                        <Text style={[
                                                            styles.tableCell,
                                                            score === scoreValue ? {
                                                                color: '#7c3aed',
                                                                fontWeight: 'bold',
                                                                backgroundColor: '#f3f4f6'
                                                            } : {}
                                                        ]}>
                                                            {score === scoreValue ? 'O' : ''}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        );
                                    })}
                                </View>
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


                {/* 페이지 번호 */}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
};

export default ReportPDF;