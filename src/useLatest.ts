import { useLayoutEffect, useRef } from 'react'

export function useLatest<T>(value: T) {
  const valueRef = useRef(value)

  useLayoutEffect(() => {
    valueRef.current = value
  })

  return valueRef
}
