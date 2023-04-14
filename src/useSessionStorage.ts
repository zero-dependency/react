import { useWebStorage } from './useWebStorage.js'
import type {
  ExcludeFunction,
  StorageOptions
} from '@zero-dependency/storage/dist/types.js'

/**
 * React hook for managing `sessionStorage`
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  options?: StorageOptions<T>
) {
  return useWebStorage(key, initialValue, sessionStorage, options)
}
