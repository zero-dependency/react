import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { WebStorage } from '@zero-dependency/storage'
import type { ExcludeFunction, StorageOptions } from '@zero-dependency/storage'

export function useStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  storage: Storage,
  options?: StorageOptions<T>
) {
  const webStorage = useRef<WebStorage<T>>()
  const [value, setValue] = useState<T>()

  useLayoutEffect(() => {
    webStorage.current = new WebStorage(key, initialValue, storage, options)
    setValue(webStorage.current.values)
  }, [key])

  const set = useCallback(
    (value: T) => {
      webStorage.current!.write(value)
      setValue(value)
    },
    [webStorage, setValue]
  )

  const reset = useCallback(() => {
    webStorage.current!.reset()
    setValue(initialValue)
  }, [webStorage, setValue])

  return [
    value,
    set,
    reset
  ] as const
}
