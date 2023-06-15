import { useWebStorage } from './useWebStorage.js'
import type {
  ExcludeFunction,
  StorageOptions
} from '@zero-dependency/storage/dist/types.js'

/**
 * Returns a hook that provides a way to read from and write to the `localStorage` of the browser.
 *
 * @param {string} key
 * The key to use when reading/writing from/to `localStorage`.
 *
 * @param {T} initialValue
 * The initial value to use when the key is not found in `localStorage`.
 *
 * @param {StorageOptions<T>} options
 * Optional configuration options for the hook.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  options?: StorageOptions<T>
) {
  return useWebStorage(key, initialValue, localStorage, options)
}
