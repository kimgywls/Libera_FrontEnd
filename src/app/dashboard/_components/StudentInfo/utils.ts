import { DesiredSchool } from '@/app/types/university';

export function formatDate(date: Date | null | undefined): string {
    if (!date) return '-';
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });
}

export function getNextPriority(desiredSchools: DesiredSchool[]): number {
    if (!desiredSchools || desiredSchools.length === 0) return 10;
    const maxPriority = Math.max(...desiredSchools.map(dep => dep.priority ?? 10));
    return maxPriority + 1;
} 