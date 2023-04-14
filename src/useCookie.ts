import { useCallback, useRef, useState } from 'react'
import { Cookie } from '@zero-dependency/cookie'
import { KeyOf } from './types.js'
import type {
  CookieDomainAttributes,
  CookieOptions
} from '@zero-dependency/cookie'

/**
 * React hook for managing cookies
 * @example
 * const [cookies, setCookie, removeCookie] = useCookie()
 *
 * // set initial value
 * useLayoutEffect(() => {
 *   if (!cookies.theme) {
 *     setCookie('theme', 'dark')
 *   }
 * }, [])
 * @param options Cookie options
 */
export function useCookie<T extends Record<string, any>>(
  options?: CookieOptions
) {
  const cookieRef = useRef(new Cookie(options))
  const [cookies, setCookies] = useState<T>(() => cookieRef.current.list())

  const set = useCallback(
    <K extends KeyOf<T>>(name: K, value: T[K]) => {
      if (get(name) === value) return
      cookieRef.current.set(name, value)
      setCookies(cookieRef.current.list())
    },
    [cookieRef, setCookies]
  )

  const remove = useCallback(
    <K extends KeyOf<T>>(name: K, attributes?: CookieDomainAttributes) => {
      if (!get(name)) return
      cookieRef.current.remove(name, attributes)
      setCookies(cookieRef.current.list())
    },
    [cookieRef, setCookies]
  )

  const get = useCallback(
    <K extends KeyOf<T>>(name: K) => {
      return cookieRef.current.get(name)
    },
    [cookieRef]
  )

  return [
    cookies,
    set,
    remove,
    get
  ] as const
}
