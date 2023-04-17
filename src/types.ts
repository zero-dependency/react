export type KeyOf<T> = Extract<keyof T, string>
export type CallbackFn<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void
