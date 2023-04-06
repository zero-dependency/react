import { lazy } from 'react'

export function namedLazy<T extends Record<string, any>>(
  loader: () => Promise<T>,
  name: keyof T
): React.LazyExoticComponent<T[keyof T]> {
  return lazy(async () => {
    const module = await loader()
    return { default: module[name] }
  })
}
