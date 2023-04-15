import { createContext } from 'react'
import { useProviderContext } from './useProviderContext.js'

export function createProvider<T>(
  displayName: string,
  defaultValue: T | null = null
) {
  const context = createContext<T | null>(defaultValue)
  const hook = () => useProviderContext(displayName, context)
  const provider = context.Provider
  const consumer = context.Consumer

  return [
    hook,
    provider,
    consumer
  ] as const
}
