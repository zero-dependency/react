import { useReducer } from 'react'

const reducer = (value: number) => (value + 1) % 1000000

/**
 * Returns a React dispatch function that can be called to force a component re-render.
 *
 * @return {React.DispatchWithoutAction}
 * The dispatch function.
 */
export function useForceUpdate(): React.DispatchWithoutAction {
  const [, update] = useReducer(reducer, 0)
  return update
}
