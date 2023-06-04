import { createContext } from 'react'
import { useContextProvider } from './useContextProvider.js'

/**
 * Creates a context provider, hook, and consumer
 * @param displayName The name of the context. Used for error messages
 * @param defaultValue The default value of the context
 * @returns A tuple of the hook, provider, and consumer
 */
export function createProvider<T>(
  displayName: string,
  defaultValue: T | null = null
): readonly [
  hook: () => T,
  provider: React.Provider<T | null>,
  consumer: React.Consumer<T | null>
] {
  const context = createContext<T | null>(defaultValue)
  const hook = () => useContextProvider(displayName, context)
  const provider = context.Provider
  const consumer = context.Consumer

  return [
    hook,
    provider,
    consumer
  ]
}
