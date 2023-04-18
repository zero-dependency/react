import { useEffect, useRef } from 'react'

/**
 * A hook that returns a ref that always contains the previous value
 * @param value The value to store in a ref
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
