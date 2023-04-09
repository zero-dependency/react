import { createElement } from 'react'

type Provider<Props = {}> = [React.ElementType, Props?]

export function componentTree(providers: Provider[]) {
  return ({ children }: { children: JSX.Element }) => {
    let currentChildren = children

    for (let i = providers.length - 1; i >= 0; i--) {
      const [component, props = {}] = providers[i]!
      currentChildren = createElement(component, props, currentChildren)
    }

    return currentChildren
  }
}
