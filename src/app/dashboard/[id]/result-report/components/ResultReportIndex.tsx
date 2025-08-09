import { FC } from "react";

const ResultReportIndex: FC = () => {
    const tableOfContents = [
        {
            number: "1",
            title: "학생부 교과 판정",
            subItems: [
                { number: "1-1", title: "학생부 성적 분석" },
                { number: "1-2", title: "성적 변화 추이 그래프" }
            ]
        },
        {
            number: "2",
            title: "학생부 비교과 판정",
            subItems: [
                { number: "2-1", title: "학생부 비교과 평가" },
                { number: "2-2", title: "학생부 비교과 분석" }
            ]
        },
        {
            number: "3",
            title: "최종 학교 추천",
            subItems: []
        },
        {
            number: "4",
            title: "종합 평가",
            subItems: []
        }
    ];

    return (
        <div className="w-full flex flex-col" style={{ backgroundColor: '#ffffff' }}>
            {/* 상단 헤더 */}
            <div className="flex justify-between items-center px-12 py-6">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#7c3aed' }}>
                        <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <span className="text-2xl font-light" style={{ color: '#1e1b4b' }}>Libera</span>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="flex flex-col px-12 py-4 flex-1">
                {/* 제목 섹션 */}
                <div className="mb-8">
                    <div className="text-sm font-medium mb-4 tracking-wider uppercase"
                        style={{ color: '#7c3aed' }}>
                        Table of Contents
                    </div>
                    <h1 className="text-5xl font-light mb-6 leading-tight" style={{ color: '#1e1b4b' }}>
                        목차
                    </h1>
                    <div className="w-24 h-px mb-8" style={{ backgroundColor: '#7c3aed' }}></div>
                </div>

                {/* 목차 리스트 - 2열 그리드 */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {/* 첫 번째 열: 1, 2번 */}
                    <div className="space-y-6">
                        {tableOfContents.slice(0, 2).map((item, index) => (
                            <div key={index} className="space-y-3">
                                {/* 메인 항목 */}
                                <div className="flex items-start py-3 border-b"
                                    style={{ borderColor: '#e5e7eb' }}>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: '#f3f4f6' }}>
                                            <span className="text-lg font-semibold" style={{ color: '#7c3aed' }}>
                                                {item.number}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-medium leading-tight" style={{ color: '#1e1b4b' }}>
                                            {item.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* 하위 항목들 */}
                                {item.subItems.map((subItem, subIndex) => (
                                    <div key={subIndex} className="flex items-center py-1 ml-13">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm font-medium" style={{ color: '#7c3aed' }}>
                                                {subItem.number}
                                            </span>
                                            <h3 className="text-base" style={{ color: '#374151' }}>
                                                {subItem.title}
                                            </h3>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* 두 번째 열: 3, 4번 */}
                    <div className="space-y-6">
                        {tableOfContents.slice(2, 4).map((item, index) => (
                            <div key={index + 2} className="space-y-3">
                                {/* 메인 항목 */}
                                <div className="flex items-start py-3 border-b"
                                    style={{ borderColor: '#e5e7eb' }}>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: '#f3f4f6' }}>
                                            <span className="text-lg font-semibold" style={{ color: '#7c3aed' }}>
                                                {item.number}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-medium leading-tight" style={{ color: '#1e1b4b' }}>
                                            {item.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* 하위 항목들 */}
                                {item.subItems.map((subItem, subIndex) => (
                                    <div key={subIndex} className="flex items-center py-1 ml-13">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm font-medium" style={{ color: '#7c3aed' }}>
                                                {subItem.number}
                                            </span>
                                            <h3 className="text-base" style={{ color: '#374151' }}>
                                                {subItem.title}
                                            </h3>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 하단 여백 */}
                <div className="flex-1 min-h-[100px]"></div>
            </div>
        </div>
    );
};

export default ResultReportIndex;