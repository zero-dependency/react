import { useEffect, useRef } from 'react'
import type { DependencyList, EffectCallback } from 'react'

/**
 * A hook that runs a callback after the first render.
 *
 * @param callback
 * The callback to run after the first render.
 *
 * @param deps
 * The dependencies to watch for changes.
 */
export function useDidUpdate(
  callback: EffectCallback,
  deps?: DependencyList
): void {
  const mounted = useRef(false)

  useEffect(
    () => () => {
      mounted.current = false
    },
    []
  )

  useEffect(() => {
    if (mounted.current) {
      return callback()
    }

    mounted.current = true
    return undefined
  }, deps)
}
