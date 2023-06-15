import { useLayoutEffect, useRef } from 'react'
import type { CallbackFn } from './types.js'

/**
 * Returns a stable version of the provided callback function that can be safely passed to other hooks
 * that depend on it. This is achieved by creating a mutable ref object that contains both the original
 * callback function and the stable version. The stable version is created by calling the original callback
 * function with the current arguments. When the provided callback function changes, the ref object is
 * updated to contain the new callback function, effectively creating a new stable version.
 *
 * @param {T} callback
 * the original callback function to create a stable version of
 *
 * @return {CallbackFn<T>}
 * A stable version of the provided callback function
 *
 * @see
 * https://github.com/reactjs/rfcs/pull/220
 */
export function useEvent<T extends (...args: any[]) => any>(
  callback: T
): CallbackFn<T> {
  const ref: React.MutableRefObject<{
    stableFn: CallbackFn<T>
    callback: CallbackFn<T>
  }> = useRef({
    stableFn: (...args) => ref.current.callback(...args),
    callback
  })

  useLayoutEffect(() => {
    ref.current.callback = callback
  })

  return ref.current.stableFn
}
