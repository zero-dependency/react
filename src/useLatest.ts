import { useLayoutEffect, useRef } from 'react'

/**
 * This is mostly useful to get access to the latest value of some props
 * or state inside an asynchronous callback,
 * instead of that value at the time the callback was created from
 * @param value The value to store in a ref
 */
export function useLatest<T>(value: T) {
  const valueRef = useRef(value)

  useLayoutEffect(() => {
    valueRef.current = value
  })

  return valueRef
}
