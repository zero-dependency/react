import { useEffect } from 'react'
import { useDidUpdate } from './useDidUpdate.js'
import type { DependencyList } from 'react'

/**
 * A hook that logs when a component mounts and updates.
 *
 * @param name
 * The name of the component.
 *
 * @param deps
 * The dependencies to watch for changes.
 */
export function useLogger(name: string, deps: DependencyList): void {
  useEffect(() => {
    console.log(`${name} mounted`, ...deps)
    return () => console.log(`${name} unmounted`)
  }, [])

  useDidUpdate(() => {
    console.log(`${name} updated`, ...deps)
  }, deps)
}
