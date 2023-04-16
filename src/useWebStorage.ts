import { useCallback, useLayoutEffect, useRef, useState } from 'react'
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
) {
  const webStorageRef = useRef<WebStorage<T>>()
  const [value, setValue] = useState<T>()

  useLayoutEffect(() => {
    webStorageRef.current = new WebStorage(key, initialValue, storage, options)
    setValue(webStorageRef.current.values)
  }, [key])

  const set = useCallback(
    (value: T) => {
      webStorageRef.current!.write(value)
      setValue(value)
    },
    [setValue]
  )

  const reset = useCallback(() => {
    webStorageRef.current!.reset()
    setValue(initialValue)
  }, [setValue])

  return [
    value,
    set,
    reset
  ] as const
}
