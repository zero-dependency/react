import { createContext } from 'react'
import { useContextProvider } from './useContextProvider.js'

export function createProvider<T>(
  displayName: string,
  defaultValue: T | null = null
) {
  const context = createContext<T | null>(defaultValue)
  const hook = () => useContextProvider(displayName, context)
  const provider = context.Provider
  const consumer = context.Consumer

  return [
    hook,
    provider,
    consumer
  ] as const
}
