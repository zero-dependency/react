import { useEffect, useRef } from 'react'
import type { DependencyList, EffectCallback } from 'react'

export function useDidUpdate(
  callback: EffectCallback,
  dependencies?: DependencyList
) {
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
  }, dependencies)
}
