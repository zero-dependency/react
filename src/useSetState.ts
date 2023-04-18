import { useCallback, useState } from 'react'
import type { SetStateActionPartial } from './types.js'

/**
 * @param initialState Initial state
 * @example
 * ```jsx
 * const [state, setState] = useSetState({ count: 1, name: 'John' })
 *
 * function increment() {
 *   setState((state) => ({ count: state.count + 1 }))
 * }
 *
 * function setName(name: string) {
 *   setState({ name })
 * }
 * ```
 */
export function useSetState<State extends Record<string, any>>(
  initialState: State
) {
  const [state, _setState] = useState(initialState)

  const setState = useCallback(
    (setStateAction: SetStateActionPartial<State>) =>
      _setState((current) => ({
        ...current,
        ...(setStateAction instanceof Function
          ? setStateAction(current)
          : setStateAction)
      })),
    []
  )

  return [state, setState] as const
}
