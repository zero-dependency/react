import { useCallback } from 'react'

type Refs<T> =
  | ((value: T | null) => void)
  | React.MutableRefObject<T | null>
  | null
  | undefined

/**
 * Returns a function that merges multiple React refs into one.
 *
 * @template T
 * The type of the ref value
 *
 * @param {...Refs<T>} refs
 * The refs to be merged
 *
 * @return {(value: T | null) => void}
 * A function that sets the value of all merged refs
 */
export function useMergeRefs<T>(...refs: Refs<T>[]): (value: T | null) => void {
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
