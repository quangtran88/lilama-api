export function initCache<Schema>(fetchData: (key: string) => Promise<Schema | null>) {
    const cache: Map<string, Schema> = new Map();
    return async function get(key: string) {
        if (cache.has(key)) {
            return cache.get(key);
        }
        const data = await fetchData(key);
        if (data) {
            cache.set(key, data);
        }
        return data;
    };
}
