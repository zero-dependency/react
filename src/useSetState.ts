import { useCallback, useState } from 'react'
import type { SetStateActionPartial } from './types.js'

/**
 * @param initialState
 * Initial state.
 *
 * @example
 * const [state, setState] = useSetState({ count: 1, name: 'John' })
 */
export function useSetState<State extends Record<string, any>>(
  initialState: State
): readonly [
  state: State,
  setState: (setStateAction: SetStateActionPartial<State>) => void
] {
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
