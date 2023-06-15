import { useContext } from 'react'

/**
 * A hook that throws an error if it is used outside of a context provider.
 *
 * @param displayName
 * The name of the context provider. Used for error messages.
 *
 * @param context
 * The context to use.
 */
export function useContextProvider<T>(
  displayName: string,
  context: React.Context<T>
) {
  const hook = useContext(context)

  if (!hook) {
    throw new Error(
      `use${displayName} must be used within a ${displayName}Provider`
    )
  }

  return hook
}
