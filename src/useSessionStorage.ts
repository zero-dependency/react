import { useStorage } from './useStorage.js'
import type { ExcludeFunction, StorageOptions } from '@zero-dependency/storage'

/**
 * React hook for managing `sessionStorage`
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  options?: StorageOptions<T>
) {
  return useStorage(key, initialValue, sessionStorage, options)
}
