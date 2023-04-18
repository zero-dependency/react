import { lazy } from 'react'

/**
 * A wrapper around React.lazy that allows you to specify a named export to resolve to
 * @example namedLazy(() => import('./MyComponent'), 'MyComponent')
 * @param loader a function that returns a promise that resolves to an object
 * @param name the name of the named export to resolve to
 * @returns a React.LazyExoticComponent that will resolve to the named export
 */
export function namedLazy<T extends Record<string, any>>(
  loader: () => Promise<T>,
  name: keyof T
): React.LazyExoticComponent<T[keyof T]> {
  return lazy(async () => {
    const module = await loader()
    return { default: module[name] }
  })
}
