export function mapLine(line: any, importKeys: object): any {
    const obj = {};
    for (const key in importKeys) {
        obj[key] = line[importKeys[key]];
    }
    return obj;
}
