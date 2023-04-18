import { useLayoutEffect, useRef } from 'react'

/**
 * A hook that returns a ref that always contains the latest value
 * @param value The value to store in a ref
 */
export function useLatest<T>(value: T) {
  const valueRef = useRef(value)

  useLayoutEffect(() => {
    valueRef.current = value
  })

  return valueRef
}
