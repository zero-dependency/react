import { useCallback } from 'react'

type Refs<T> =
  | ((value: T | null) => void)
  | React.MutableRefObject<T | null>
  | null
  | undefined

export function useMergeRefs<T>(...refs: Refs<T>[]) {
  const mergedRefs = useCallback((value: T | null) => {
    for (const ref of refs) {
      if (!ref) continue

      if (ref instanceof Function) {
        ref(value)
      } else {
        ref.current = value
      }
    }
  }, refs)

  return mergedRefs
}
