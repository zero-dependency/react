import { useWebStorage } from './useWebStorage.js'
import type {
  ExcludeFunction,
  StorageOptions
} from '@zero-dependency/storage/dist/types.js'

/**
 * Returns a hook that provides a `sessionStorage` value for a given key.
 *
 * @param {string} key
 * The key to use for the `sessionStorage`.
 *
 * @param {ExcludeFunction<T>} initialValue
 * The initial value to use for the `sessionStorage`.
 *
 * @param {StorageOptions<T>} [options]
 * Optional options to configure the behavior of the hook.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  options?: StorageOptions<T>
) {
  return useWebStorage(key, initialValue, sessionStorage, options)
}
