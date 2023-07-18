import { useCallback, useMemo, useState } from 'react'
import { Cookie } from '@zero-dependency/cookie'
import type { KeyOf } from './types.js'
import type {
  CookieDomainAttributes,
  CookieOptions
} from '@zero-dependency/cookie'

/**
 * React hook for managing cookies.
 *
 * @param options
 * Cookie options.
 *
 * @example
 * ```jsx
 * function App() {
 *   const [cookies, { setCookie, removeCookie }] = useCookie({
 *     initialValue: {
 *       theme: 'dark'
 *     }
 *   })
 *
 *   return <h1>Theme: {cookies.theme}</h1>
 * }
 * ```
 */
export function useCookie<CookieValues extends Record<string, any>>(
  options?: CookieOptions<CookieValues>
): readonly [
  cookies: CookieValues,
  methods: {
    readonly setCookie: <Name extends KeyOf<CookieValues>>(
      name: Name,
      value: CookieValues[Name]
    ) => void
    readonly removeCookie: <Name extends KeyOf<CookieValues>>(
      name: Name,
      attributes?: CookieDomainAttributes
    ) => void
    readonly getCookie: <Name extends KeyOf<CookieValues>>(
      name: Name
    ) => CookieValues[Name] | null
  }
] {
  const cookie = useMemo(() => new Cookie(options), [])
  const [value, setValue] = useState(() => cookie.list())

  const setCookie = useCallback(
    <Name extends KeyOf<CookieValues>>(
      name: Name,
      value: CookieValues[Name]
    ) => {
      if (getCookie(name) === value) return
      cookie.set(name, value)
      setValue(cookie.list())
    },
    []
  )

  const removeCookie = useCallback(
    <Name extends KeyOf<CookieValues>>(
      name: Name,
      attributes?: CookieDomainAttributes
    ) => {
      if (!cookie.has(name)) return
      cookie.remove(name, attributes)
      setValue(cookie.list())
    },
    []
  )

  const getCookie = useCallback(
    <Name extends KeyOf<CookieValues>>(name: Name) => {
      return cookie.get(name)
    },
    []
  )

  return [
    value,
    {
      setCookie,
      removeCookie,
      getCookie
    }
  ] as const
}
