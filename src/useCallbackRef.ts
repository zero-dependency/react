import { useLayoutEffect, useRef } from 'react'
import type { CallbackFn } from './types.js'

/**
 * Allow to access a fresh closures in the function but returns stable reference during rerenders
 * @see https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 * @see https://github.com/reactjs/rfcs/pull/220#issuecomment-1259938816
 */
export function useCallbackRef<T extends (...args: any[]) => any>(
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
