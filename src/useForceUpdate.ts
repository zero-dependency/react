import { useReducer } from 'react'

const reducer = (value: number) => (value + 1) % 1000000

/**
 * Forces a component to re-render
 * @returns A function that can be called to force a component to re-render
 */
export function useForceUpdate() {
  const [, update] = useReducer(reducer, 0)
  return update
}
