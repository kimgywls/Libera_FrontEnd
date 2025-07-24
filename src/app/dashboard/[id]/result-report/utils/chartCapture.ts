import html2canvas from 'html2canvas';

export const captureChartAsImage = async (elementId: string): Promise<string> => {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error('Chart element not found');
        }

        // 차트를 캡처하기 전에 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 1,
            useCORS: true,
            allowTaint: true,
            logging: false,
            removeContainer: false,
            foreignObjectRendering: false,
            imageTimeout: 15000,
            width: element.offsetWidth,
            height: element.offsetHeight,
            onclone: (clonedDoc) => {
                // 복제된 문서에서 oklch 색상을 제거
                const allElements = clonedDoc.querySelectorAll('*');
                allElements.forEach((el) => {
                    const computedStyle = window.getComputedStyle(el);
                    if (computedStyle.color && computedStyle.color.includes('oklch')) {
                        (el as HTMLElement).style.color = '#000000';
                    }
                    if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('oklch')) {
                        (el as HTMLElement).style.backgroundColor = '#ffffff';
                    }
                });
            }
        });

        const dataUrl = canvas.toDataURL('image/png');
        return dataUrl;
    } catch {
        return '';
    }
};

export const captureMultipleCharts = async (elementIds: string[]): Promise<string[]> => {
    const promises = elementIds.map(id => captureChartAsImage(id));
    return Promise.all(promises);
};

export const captureIndividualCharts = async (baseElementId: string, chartIds: string[]): Promise<string[]> => {
    const promises = chartIds.map(id => captureChartAsImage(id));
    return Promise.all(promises);
}; 