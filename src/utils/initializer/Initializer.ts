import { ClientSession } from "mongoose";

export abstract class Initializer<Schema, DTO> {
    protected readCache: Map<string, Schema> = new Map();
    protected insertedCache: Map<string, Schema> = new Map();

    protected abstract getKey(dto: DTO): string;
    protected abstract shouldInsert(dto: DTO): boolean;
    protected abstract insert(dto: DTO, updatedBy: string, s: ClientSession): Promise<Schema>;
    protected abstract getData(dto: DTO, updatedBy: string, s: ClientSession): Promise<Schema | null>;

    async init(dto: DTO, updatedBy: string, s: ClientSession): Promise<Schema> {
        const key = this.getKey(dto);
        if (this.insertedCache.has(key)) {
            return this.insertedCache.get(key)!;
        }
        if (this.shouldInsert(dto)) {
            const inserted = await this.insert(dto, updatedBy, s);
            this.insertedCache.set(key, inserted);
            return inserted;
        }
        if (this.readCache.has(key)) {
            return this.readCache.get(key)!;
        }
        const readData = await this.getData(dto, updatedBy, s);
        this.readCache.set(key, readData!);
        return readData!;
    }
}
