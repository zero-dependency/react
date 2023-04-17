import { useCallback, useMemo, useState } from 'react'
import { Cookie } from '@zero-dependency/cookie'
import { KeyOf } from './types.js'
import type {
  CookieDomainAttributes,
  CookieOptions
} from '@zero-dependency/cookie'

/**
 * React hook for managing cookies
 * @example
 * const [cookies, setCookie, removeCookie] = useCookie({
 *   initialValue: {
 *     theme: 'dark'
 *   }
 * })
 *
 * return <h1>Theme: {cookies.theme}</h1>
 * @param options Cookie options
 */
export function useCookie<T extends Record<string, any>>(
  options?: CookieOptions<T>
) {
  const cookie = useMemo(() => new Cookie(options), [])
  const [value, setValue] = useState(() => cookie.list())

  const setCookie = useCallback(<K extends KeyOf<T>>(name: K, value: T[K]) => {
    if (getCookie(name) === value) return
    cookie.set(name, value)
    setValue(cookie.list())
  }, [])

  const removeCookie = useCallback(
    <K extends KeyOf<T>>(name: K, attributes?: CookieDomainAttributes) => {
      if (!cookie.has(name)) return
      cookie.remove(name, attributes)
      setValue(cookie.list())
    },
    []
  )

  const getCookie = useCallback(<K extends KeyOf<T>>(name: K) => {
    return cookie.get(name)
  }, [])

  return [
    value,
    setCookie,
    removeCookie,
    getCookie
  ] as const
}
