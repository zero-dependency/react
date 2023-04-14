import { useCallback, useRef, useState } from 'react'
import { WebStorage } from '@zero-dependency/storage'
import type { ExcludeFunction, StorageOptions } from '@zero-dependency/storage'

export function useStorage<T>(
  key: string,
  initialValue: ExcludeFunction<T>,
  storage: Storage,
  options?: StorageOptions<T>
) {
  const webStorage = useRef(
    (
      key: string,
      initialValue: ExcludeFunction<T>,
      options?: StorageOptions<T>
    ) => new WebStorage(key, initialValue, storage, options)
  )

  const [state, setState] = useState<T>(
    () => webStorage.current(key, initialValue, options).values
  )

  const set = useCallback(
    (value: T) => {
      webStorage.current(key, initialValue, options).write(value)
      setState(value)
    },
    [
      key,
      initialValue,
      options,
      setState
    ]
  )

  const reset = useCallback(() => {
    webStorage.current(key, initialValue, options).reset()
    setState(initialValue)
  }, [
    key,
    initialValue,
    options,
    setState
  ])

  return [
    state,
    set,
    reset
  ] as const
}
