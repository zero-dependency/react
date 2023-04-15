import { useContext } from 'react'

export function useProviderContext<T>(
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
