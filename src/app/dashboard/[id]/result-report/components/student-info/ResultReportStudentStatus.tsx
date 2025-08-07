import { FC } from 'react';
import { StudentInfo as StudentInfoType } from '@/app/types/student';
import { MapPin, School, TrendingUp } from 'lucide-react';

const ResultReportStudentStatus: FC<{ student: StudentInfoType }> = ({ student }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            display: 'flex',
            alignItems: 'center'
        }}>
            <School style={{ width: '20px', height: '20px', color: '#3b82f6', marginRight: '8px' }} />
            현재 상태
        </h3>
        <div style={{
            borderRadius: '8px',
            padding: '16px',
            flex: 1,
            backgroundColor: '#ffffff'
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin style={{ width: '20px', height: '20px', color: '#3b82f6', marginTop: '2px' }} />
                <div>
                    <p style={{ fontWeight: '600', color: '#374151' }}>재학 중인 학교</p>
                    <p style={{ color: '#111827', marginTop: '4px' }}>
                        {student?.current_school_name}
                    </p>
                </div>
            </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <div style={{
                borderRadius: '8px',
                padding: '16px',
                flex: 1,
                backgroundColor: '#ffffff'
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <TrendingUp style={{ width: '20px', height: '20px', color: '#3b82f6', marginTop: '2px' }} />
                    <div>
                        <p style={{ fontWeight: '600', color: '#374151' }}>전학기 전체교과 내신 성적</p>
                        <p style={{ color: '#111827', marginTop: '4px' }}>
                            {student?.overall_score} 등급
                        </p>
                    </div>
                </div>
            </div>
            <div style={{
                borderRadius: '8px',
                padding: '16px',
                flex: 1,
                backgroundColor: '#ffffff'
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <TrendingUp style={{ width: '20px', height: '20px', color: '#3b82f6', marginTop: '2px' }} />
                    <div>
                        <p style={{ fontWeight: '600', color: '#374151' }}>전학기 주요과목 내신 성적</p>
                        <p style={{ color: '#111827', marginTop: '4px' }}>
                            {student?.main_subjects_score} 등급
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ResultReportStudentStatus; 