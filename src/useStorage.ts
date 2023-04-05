import { useCallback, useRef, useState } from 'react'
import type { LocalStorage, SessionStorage } from '@zero-dependency/storage'
import type {
  ExcludeFunction,
  StorageOptions
} from '@zero-dependency/storage/dist/types.js'

type StorageAdapter = typeof LocalStorage | typeof SessionStorage

export function useStorage<T>(
  adapter: StorageAdapter,
  key: string,
  initialValue: ExcludeFunction<T>,
  options?: StorageOptions<T>
) {
  const storage = useRef(
    (
      key: string,
      initialValue: ExcludeFunction<T>,
      options?: StorageOptions<T>
    ) => new adapter(key, initialValue, options)
  )

  const [state, setState] = useState<T>(
    () => storage.current(key, initialValue, options).values
  )

  const set = useCallback(
    (value: T) => {
      storage.current(key, initialValue, options).write(value)
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
    storage.current(key, initialValue, options).reset()
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
