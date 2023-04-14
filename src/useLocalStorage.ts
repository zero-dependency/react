import { useStorage } from './useStorage.js'
import type { ExcludeFunction, StorageOptions } from '@zero-dependency/storage'

/**
 * React hook for managing `localStorage`
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  options?: StorageOptions<T>
) {
  return useStorage(key, initialValue, localStorage, options)
}
