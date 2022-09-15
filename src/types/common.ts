export type PartialExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;
