import { useCallback, useMemo, useState } from 'react'
import { WebStorage } from '@zero-dependency/storage'
import type {
  ExcludeFunction,
  StorageOptions
} from '@zero-dependency/storage/dist/types.js'

export function useWebStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  storage: Storage,
  options?: StorageOptions<T>
): readonly [
  value: T,
  setValue: (value: React.SetStateAction<T>) => void,
  resetValue: () => void
] {
  const webStorage = useMemo<WebStorage<T>>(
    () => new WebStorage(key, initialValue, storage, options),
    [key]
  )
  const [value, setValue] = useState(() => webStorage.value)

  const setStorage = useCallback((value: React.SetStateAction<T>) => {
    const actualValue =
      value instanceof Function ? value(webStorage.value) : value

    webStorage.write(actualValue)
    setValue(value)
  }, [])

  const resetStorage = useCallback(() => {
    webStorage.reset()
    setValue(initialValue)
  }, [])

  return [
    value,
    setStorage,
    resetStorage
  ] as const
}
