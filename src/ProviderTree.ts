import { createElement } from 'react'

type Component = React.FunctionComponent<any>
type Props<T extends Component> = Omit<Parameters<T>[0], 'children'>
type Provider<T extends Component> = [Component, Props<T>?]

/**
 * A component that allows you to create a tree of providers
 * @example
 * ```jsx
 * <ProviderTree
 *   providers={(wrapper) => [
 *     wrapper(StrictMode),
 *     wrapper(MyProvider, { value: 'hello' }),
 *     wrapper(MyOtherProvider, { value: 'world' })
 *   ]}
 * >
 *   <App />
 * </ProviderTree>
 * ```
 */
export function ProviderTree(props: {
  providers: (
    wrapper: <T extends Component>(
      component: T,
      props?: Props<T>
    ) => Provider<T>
  ) => Provider<Component>[]
  children?: JSX.Element
}) {
  const providers = props.providers(providerWrapper)
  if (!providers.length) {
    throw new Error('ProviderTree requires at least one provider')
  }
  return createProviderTree(providers, props.children)
}

function createProviderTree<T extends Component>(
  providers: Provider<T>[],
  children?: JSX.Element
): JSX.Element {
  const [provider, props = {}] = providers.shift()!
  return createElement(
    provider,
    props,
    providers.length ? createProviderTree(providers, children) : children
  )
}

function providerWrapper<T extends Component>(
  provider: T,
  props?: Parameters<T>[0]
): Provider<T> {
  return [provider, props]
}
