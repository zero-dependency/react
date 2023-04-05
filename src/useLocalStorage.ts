import { LocalStorage } from '@zero-dependency/storage'
import { useStorage } from './useStorage.js'
import type {
  ExcludeFunction,
  StorageOptions
} from '@zero-dependency/storage/dist/types.js'

export function useLocalStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  options?: StorageOptions<T>
) {
  return useStorage(LocalStorage, key, initialValue, options)
}
