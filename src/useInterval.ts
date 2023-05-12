import { useEffect } from 'react'

export function useInterval(callback: () => void, ms: number) {
  useEffect(() => {
    const intervalId = setInterval(callback, ms)
    return () => clearInterval(intervalId)
  }, [callback, ms])
}
