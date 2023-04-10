import { createElement } from 'react'

type Component = React.FunctionComponent<any>
type Props<T extends Component> = Omit<Parameters<T>[0], 'children'>
type Provider<T extends Component> = [Component, Props<T>?]

export function ProvidersTree(props: {
  children?: JSX.Element
  providers: (
    wrapper: <T extends Component>(
      component: T,
      props?: Props<T>
    ) => Provider<T>
  ) => Provider<Component>[]
}) {
  const providers = props.providers(componentWrapper)
  let currentChildren = props.children!

  for (let i = providers.length - 1; i >= 0; i--) {
    const [component, props = {}] = providers[i]!
    currentChildren = createElement(component, props, currentChildren)
  }

  return currentChildren
}

function componentWrapper<T extends Component>(
  component: T,
  props?: Parameters<T>[0]
): Provider<T> {
  return [component, props]
}
