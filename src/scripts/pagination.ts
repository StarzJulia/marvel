export function getPagesCount (total: number, limit: number): number {
    return Math.ceil(total / limit);
}

export function getCurrentPage (offset: number, count: number, limit: number): number {
    return Math.ceil((offset + count) / limit);
}