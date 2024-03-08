import React from 'react'
import type { JSXElementConstructor, ReactNode } from 'react'

type NoInfer<T> = [T][T extends any ? 0 : 1]

type ContainsChildren = {
  children?: React.ReactNode
}

/**
 * Creates a provider tree with the given providers and children.
 *
 * @param {function} props.providers
 * A function that returns an array of component providers.
 *
 * @param {ReactNode} [props.children]
 * The children to render inside the provider tree.
 *
 * @throws {Error}
 * When there are no providers provided.
 *
 * @return {ReactNode}
 * The provider tree with the given providers and children.
 *
 * @example
 * ```jsx
 * <ProviderStack
 *   providers={[
 *     [StrictMode],
 *     [ThemeProvider, { theme: 'dark' }]
 *   ]}
 * >
 *   <App />
 * </ProviderStack>
 * ```
 */
export function ProviderTree<
  Providers extends [ContainsChildren, ...ContainsChildren[]]
>({
  providers,
  children
}: {
  providers: {
    [K in keyof Providers]: [
      provider: JSXElementConstructor<Providers[K]>,
      props?: Omit<NoInfer<Providers[K]>, 'children'>
    ]
  }
  children: ReactNode
}): ReactNode {
  let node = children

  for (let i = providers.length - 1; i >= 0; i--) {
    const [Provider, props] = providers[i]!
    node = <Provider {...props}>{node}</Provider>
  }

  return node
}
