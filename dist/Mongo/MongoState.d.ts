export interface MongoStateData<T extends string> {
    stage: T;
    data: object;
}
export interface MongoState<T extends string> extends MongoStateData<T> {
    userId: number;
}
