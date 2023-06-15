import { useEffect } from 'react'

/**
 * A custom hook that invokes a callback function at a specified interval.
 *
 * @param {Function} callback
 * The function to be invoked at the specified interval.
 *
 * @param {number} ms
 * The time (in milliseconds) between each invocation of the callback function.
 *
 * @return {void}
 */
export function useInterval(callback: () => void, ms: number): void {
  useEffect(() => {
    const intervalId = setInterval(callback, ms)
    return () => clearInterval(intervalId)
  }, [callback, ms])
}
