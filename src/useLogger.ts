import { useEffect } from 'react'
import { useDidUpdate } from './useDidUpdate.js'
import type { DependencyList } from 'react'

export function useLogger(name: string, dependencies: DependencyList) {
  useEffect(() => {
    console.log(`${name} mounted`, ...dependencies)
    return () => console.log(`${name} unmounted`)
  }, [])

  useDidUpdate(() => {
    console.log(`${name} updated`, ...dependencies)
  }, dependencies)

  return null
}
