import { useCallback, useRef, useState } from 'react'
import { Cookie } from '@zero-dependency/cookie'
import { KeyOf } from './types.js'
import type {
  CookieDomainAttributes,
  CookieOptions
} from '@zero-dependency/cookie'

export function useCookie<T extends Record<string, any>>(
  options?: CookieOptions
) {
  const cookie = useRef((options?: CookieOptions) => new Cookie(options))
  const [cookies, setCookies] = useState<T>(() =>
    cookie.current(options).list()
  )

  const set = useCallback(
    <K extends KeyOf<T>>(name: K, value: T[K]) => {
      cookie.current(options).set(name, value)
      setCookies(cookie.current(options).list())
    },
    [options, setCookies]
  )

  const remove = useCallback(
    <K extends KeyOf<T>>(name: K, attributes?: CookieDomainAttributes) => {
      cookie.current(options).remove(name, attributes)
      setCookies(cookie.current(options).list())
    },
    [options, setCookies]
  )

  return [
    cookies,
    set,
    remove
  ] as const
}
