'use client';

import { FC } from "react";
import { Settings, ArrowLeft, Database, User, Upload } from "lucide-react";
import UploadAdmissionData from "./UploadAdmissionData";
import { useRouter } from "next/navigation";

const SettingsWidget: FC = () => {
    const router = useRouter();

    return (
        <div>
            {/* 헤더 영역 */}
            <div className="bg-white shadow-sm border-b border-gray-200 mb-4">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* 왼쪽: 뒤로가기 + 제목 */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/main')}
                                className="group flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="p-2">
                                    <Settings className="w-6 h-6 text-violet-500" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">관리자 설정</h1>
                                    <p className="text-sm text-gray-500">시스템 관리 및 데이터 설정</p>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽: 사용자 정보 */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-lg">
                                <span className="text-sm font-medium text-slate-700">관리자</span>
                            </div>
                            <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="max-w-7xl mx-auto px-6 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 왼쪽: 설정 메뉴 */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-800">설정 메뉴</h2>
                                <p className="text-sm text-gray-500 mt-1">관리 기능을 선택하세요</p>
                            </div>
                            <div className="p-2">
                                <div className="space-y-1">
                                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-violet-50 border border-violet-200 text-gray-800 font-medium">
                                        <Database className="w-5 h-5 text-violet-500" />
                                        <span>데이터 업로드</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 메인 콘텐츠 */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-violet-50">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2">
                                        <Upload className="w-5 h-5 text-violet-600" />
                                        <h2 className="text-xl font-semibold text-gray-800">입학 데이터 업로드</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <UploadAdmissionData />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsWidget;