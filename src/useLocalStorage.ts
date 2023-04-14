import { useWebStorage } from './useWebStorage.js'
import type {
  ExcludeFunction,
  StorageOptions
} from '@zero-dependency/storage/dist/types.js'

/**
 * React hook for managing `localStorage`
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  options?: StorageOptions<T>
) {
  return useWebStorage(key, initialValue, localStorage, options)
}
