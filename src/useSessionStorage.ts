import { SessionStorage } from '@zero-dependency/storage'
import { useStorage } from './useStorage.js'
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
  return useStorage(SessionStorage, key, initialValue, options)
}
